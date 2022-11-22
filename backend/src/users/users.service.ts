import { LoginResponse } from './../models/models';
import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Door } from 'src/doors/doors.entity';
import { LoginDto, TagRequestAnswer } from 'src/models/models';
import { Package } from 'src/packages/packages.entity';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { UserModel } from './users.interface';
import jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<User>,

    @Inject('PACKAGES_REPOSITORY')
    private packagesRepository: Repository<Package>,

    @Inject('DOORS_REPOSITORY')
    private doorsRepository: Repository<Door>,
  ) {}

  private users: Array<UserModel> = [];
  public findAll(): Array<UserModel> {
    return this.users;
  }

  public findOne(id: number): UserModel {
    const user: UserModel = this.users.find((user) => user.userId === id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  public async findOneByTag(tagId: string): Promise<TagRequestAnswer> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.tagId = :id', { id: tagId })
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
      .andWhere('package.retrieved = :retrievedStatus', {
        retrievedStatus: false,
      })
      .printSql()
      .getMany();

    if (packages.length === 0) {
      return response;
    }

    const doors = await this.doorsRepository
      .createQueryBuilder('door')
      .where('door.packageId IN (:packageId)', {
        packageId: packages.map((p) => p.id),
      })
      .printSql()
      .getMany();

    const doorsIDs = doors.map((door) => Number(door.id));

    response.hasPackage = true;
    response.packageDoors = doorsIDs;

    return response;
  }

  public create(user: UserModel) {
    const nameExists: boolean = this.users.some(
      (userIterated) => userIterated.name === user.name,
    );
    if (nameExists) {
      throw new UnprocessableEntityException('this user name already exists.');
    }

    const maxId: number = Math.max(...this.users.map((user) => user.userId));
    const id: number = maxId + 1;

    const userPost: UserModel = {
      ...user,
      userId: id,
    };
    this.users.push(userPost);
    return userPost;
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
      token: jwt.sign(loginDto),
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
