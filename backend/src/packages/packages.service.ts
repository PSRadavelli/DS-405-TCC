import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Package } from './packages.entity';
import { PackagesModel } from './packages.interface';

@Injectable()
export class PackagesService {
  constructor(
    @Inject('PACKAGES_REPOSITORY')
    private packagesRepository: Repository<Package>,
  ) {}

  private packages: Array<PackagesModel> = [];

  public findAll(): Array<PackagesModel> {
    return this.packages;
  }

  public findOne(id: number): PackagesModel {
    const pack: PackagesModel = this.packages.find((pack) => pack.id === id);
    if (!pack) {
      throw new NotFoundException('Package not found.');
    }
    return pack;
  }

  public findAllByUserId(userId: number): Promise<Package[]> {
    const packages = this.packagesRepository
      .createQueryBuilder('package')
      .where('package.userId = :userId', { userId })
      .orderBy('package.receivementDate', 'DESC')
      .getMany()

    return packages
  }

  public create(pack: PackagesModel) {
    const packgExists: boolean = this.packages.some(
      (packgIterated) => packgIterated.id === pack.id,
    );
    if (packgExists) {
      throw new UnprocessableEntityException('Package already exists');
    }
    const maxId: number = Math.max(...this.packages.map((packg) => packg.id));
    const id: number = maxId + 1;

    const packgPost: PackagesModel = {
      ...pack,
      id: id,
    };
    this.packages.push(packgPost);
    return packgPost;
  }

  public delete(id: number): void {
    const index: number = this.packages.findIndex((packg) => packg.id === id);
    if (index === -1) {
      throw new NotFoundException('Package not found');
    }
    this.packages.splice(index, 1);
  }

  public update(id: number, packg: PackagesModel): PackagesModel {
    const index: number = this.packages.findIndex((packg) => packg.id === id);

    if (index === -1) {
      throw new NotFoundException('Package not found');
    }

    const packageExists: boolean = this.packages.some(
      (packgIterated) =>
        packgIterated.id === packg.id &&
        packgIterated.userId === packg.userId &&
        packgIterated.receivementDate === packg.receivementDate &&
        packgIterated.retrievalDate === packg.retrievalDate,
    );
    if (packageExists) {
      throw new UnprocessableEntityException('this package already exists');
    }

    const packgPost: PackagesModel = {
      ...packg,
    };

    this.packages[index] = packgPost;
    return packgPost;
  }
}
