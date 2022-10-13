import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DoorModel } from './doors.interface';

@Injectable()
export class DoorsService {
  private doors: Array<DoorModel> = [];
  public findAll(): Array<DoorModel> {
    return this.doors;
  }

  public findOne(id: number): DoorModel {
    const door: DoorModel = this.doors.find((door) => door.id === id);
    if (!door) {
      throw new NotFoundException('Door not found.');
    }
    return door;
  }
  public create(door: DoorModel): DoorModel {
    const doorExists: boolean = this.doors.some((item) => item.id === door.id);
    if (doorExists) {
      throw new UnprocessableEntityException('Door already exists');
    }
    const maxId: number = Math.max(...this.doors.map((door) => door.id), 0);
    const id: number = maxId + 1;

    const doorPost: DoorModel = {
      ...door,
      id,
    };
    this.doors.push(doorPost);
    return doorPost;
  }

  public delete(id: number): void {
    const index: number = this.doors.findIndex((door) => door.id === id);
    if (index === -1) {
      throw new NotFoundException('Door not found');
    }
  }

  public update(id: number, door: DoorModel): DoorModel {
    const index: number = this.doors.findIndex((door) => door.id === id);
    if (index === -1) {
      throw new NotFoundException('Door not found');
    }
    const doorExists: boolean = this.doors.some(
      (doorIterated) => doorIterated.id === door.id,
    );
    if (doorExists) {
      throw new UnprocessableEntityException('Door already exists');
    }

    const doorPost: DoorModel = {
      ...door,
      id,
    };
    this.doors[index] = doorPost;
    return doorPost;
  }
}
