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
import { DoorModel } from './doors.interface';
import { DoorsService } from './doors.service';

@Controller('door')
export class DoorController {
  constructor(private readonly doorsService: DoorsService) {}

  @Get()
  public findAll(): Array<DoorModel> {
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
}
