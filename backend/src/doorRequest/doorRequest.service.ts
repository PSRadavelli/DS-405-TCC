import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { DoorRequest } from "./doorRequest.entity";
import { DoorRequestModel } from "./DoorRequest.interface";

@Injectable()
export class DoorRequestService {
  constructor(
    @Inject('DOOR_REQUEST_REPOSITORY')
    private doorRequestRepository: Repository<DoorRequest>,
  ) {}
  private doorRequests: Array<DoorRequestModel> = [];

  public async findAll(): Promise<Array<DoorRequestModel>> {
    const response = await this.doorRequestRepository
                      .createQueryBuilder()
                      .getMany();

    await this.doorRequestRepository
      .createQueryBuilder()
      .delete()
      .execute();

    return response;
  }
}
