import {
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Door } from '../doors/doors.entity';
import { LoginDto, LoginResponse, TagRequestAnswer } from '../models/models';
import { Package } from '../packages/packages.entity';
import { Repository } from 'typeorm';
import { Log } from '../logs/logs.entity';
import { User } from './users.entity';
import { UserModel } from './users.interface';
import { sendPushNotification } from '../util/sendPushNotification'

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<User>,

    @Inject('PACKAGES_REPOSITORY')
    private packagesRepository: Repository<Package>,

    @Inject('DOORS_REPOSITORY')
    private doorsRepository: Repository<Door>,

    @Inject('LOGS_REPOSITORY')
    private logsRepository: Repository<Log>,
  ) { }

  private users: Array<UserModel> = [];

  public async findAll(): Promise<Array<UserModel>> {
    const users = await this.usersRepository
      .createQueryBuilder('user')
      .getMany();

    return users;
  }

  public async findOne(id: number): Promise<UserModel> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.userId = :id', { id: id })
      .getOne();

    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  public async findOneByTag(tagId: string): Promise<TagRequestAnswer> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where("user.tagId = :id", { id: tagId })
      .printSql()
      .getOne();

    if (!user) {
      throw new NotFoundException('User tag not found.');
    }

    const response: TagRequestAnswer = {
      userId: user.userId,
      userTag: user.tagId,
      hasPackage: false,
    };

    const packages = await this.packagesRepository
      .createQueryBuilder('package')
      .where('package.userId = :userId', { userId: user.userId })
      .andWhere('package.retrieved = :retrievedStatus', { retrievedStatus: false })
      .printSql()
      .getMany();

    if (packages.length === 0) {
      return response;
    };

    const doors = await this.doorsRepository
      .createQueryBuilder('door')
      .where('door.packageId IN (:packageId)', { packageId: packages.map((p) => p.id) })
      .printSql()
      .getMany();

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    const todayString = yyyy + '-' + mm + '-' + dd;

    await this.packagesRepository.createQueryBuilder('package')
      .update(Package)
      .set({ retrieved: true, retrievalDate: todayString })
      .where('package.id IN (:...ids)', { ids: doors.map((door) => door.packageId) })
      .execute();

    await this.doorsRepository.createQueryBuilder('door')
      .update(Door)
      .set({ packageId: null })
      .where('door.id IN (:...doorIds)', { doorIds: doors.map((door) => door.id) })
      .execute();

    const message = 'Sua encomenda foi retirada!'

    doors.forEach(async () => {
      await this.logsRepository.createQueryBuilder('log')
        .insert()
        .into(Log)
        .values({
          userId: user.userId,
          text: message,
          date: todayString,
        })
        .execute();

      await sendPushNotification(message, String(user.userId))
    });

    const doorsIDs = doors.map((door) => Number(door.id));

    response.hasPackage = true;
    response.packageDoors = doorsIDs;

    return response;
  }

  public async create(user: UserModel): Promise<number> {
    let newUser

    try {
      newUser = await this.usersRepository
        .createQueryBuilder('user')
        .insert()
        .into(User)
        .values({
          name: user.name,
          surname: user.surname,
          age: user.age,
          telephone: user.telephone,
          email: user.email,
          password: user.password,
          admin: false,
          appNotification: user.appNotification,
          emailNotification: user.appNotification,
          intercomNotification: user.intercomNotification,
          tagId: user.tagId,
        })
        .execute();
    } catch(e) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new ConflictException()
      }
    }

    return newUser.identifiers[0].userId
  }

  public delete(id: number): void {
    const index: number = this.users.findIndex((user) => user.userId === id);

    if (index === -1) {
      throw new NotFoundException('User not found.');
    }

    this.users.splice(index, 1);
  }

  public update(id: number, user: UserModel): UserModel {
    const index: number = this.users.findIndex((user) => user.userId === id);

    if (index === -1) {
      throw new NotFoundException('User not found.');
    }

    const userExists: boolean = this.users.some(
      (userIterated) =>
        userIterated.name === user.name &&
        userIterated.surname === user.surname,
    );
    if (userExists) {
      throw new UnprocessableEntityException('this user already exists');
    }

    const userPost: UserModel = {
      ...user,
    };

    this.users[index] = userPost;

    return userPost;
  }

  public async login(loginDto: LoginDto): Promise<LoginResponse> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: loginDto.email })
      .getOne();

    if (user.password !== loginDto.password) {
      throw new ForbiddenException();
    }

    const response: LoginResponse = {
      token: 'token',
      user: {
        userId: user.userId,
        name: user.name,
        surname: user.surname,
        age: user.age,
        telephone: user.telephone,
        email: user.email,
        admin: user.admin,
        tagId: user.tagId,
        appNotification: user.appNotification,
        emailNotification: user.emailNotification,
        intercomNotification: user.intercomNotification,
      },
    };

    console.log(response);

    return response;
  }
}
