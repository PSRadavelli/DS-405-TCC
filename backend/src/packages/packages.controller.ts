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
import { Package } from './packages.entity';
import { PackagesModel } from './packages.interface';
import { PackagesService } from './packages.service';

@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Get()
  public findAll(): Array<PackagesModel> {
    return this.packagesService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id', ParseIntPipe) id: number): PackagesModel {
    return this.packagesService.findOne(id);
  }

  @Get('user/:userId')
  public findAllByUserId(@Param('userId', ParseIntPipe) userId: number): Promise<Package[]> {
    return this.packagesService.findAllByUserId(userId);
  }

  @Post()
  public create(@Body() packg: PackagesModel): PackagesModel {
    return this.packagesService.create(packg);
  }

  @Delete(':id')
  public delete(@Param('id', ParseIntPipe) id: number): void {
    this.packagesService.delete(id);
  }

  @Put(':id')
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() packg: PackagesModel,
  ): PackagesModel {
    return this.packagesService.update(id, packg);
  }
}
