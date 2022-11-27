import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { DoorRequestDto, DoorResponse, DoorsListResponse } from '../models/models';
import { DoorModel } from './doors.interface';
import { DoorsService } from './doors.service';

@Controller('doors')
export class DoorController {
  constructor(private readonly doorsService: DoorsService) {}

  @Get()
  public findAll(): Promise<DoorsListResponse[]> {
    return this.doorsService.findAll();
  }
  @Get(':id')
  public findOne(@Param('id', ParseIntPipe) id: number): DoorModel {
    return this.doorsService.findOne(id);
  }

  @Post()
  public create(@Body() door: DoorModel): DoorModel {
    return this.doorsService.create(door);
  }

  @Delete('id')
  public delete(@Param('id', ParseIntPipe) id: number): void {
    this.doorsService.delete(id);
  }

  @Put(':id')
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() door: DoorModel,
  ): DoorModel {
    return this.doorsService.update(id, door);
  }

  @Post('new-door')
  public requestDoor(@Body() doorRequest: DoorRequestDto): Promise<DoorResponse> {
    return this.doorsService.requestDoor(doorRequest);
  }
}
