import { Controller, Get } from "@nestjs/common";
import { DoorRequest } from "./doorRequest.entity";
import { DoorRequestModel } from "./DoorRequest.interface";
import { DoorRequestService } from "./doorRequest.service";

@Controller('doorRequest')
export class DoorRequestController {
  constructor(private readonly doorsService: DoorRequestService) {}

  @Get()
  public findAll(): Promise<Array<DoorRequestModel>> {
    return this.doorsService.findAll();
  }
}
