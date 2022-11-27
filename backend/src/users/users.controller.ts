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
import { LoginDto, LoginResponse, TagRequestAnswer } from '../models/models';
import { UserModel } from './users.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public findAll(): Promise<Array<UserModel>> {
    return this.usersService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id', ParseIntPipe) id: number): Promise<UserModel> {
    return this.usersService.findOne(id);
  }

  @Get('/tag/:tagId')
  public async find(@Param('tagId') tagId: string): Promise<TagRequestAnswer> {
    return await this.usersService.findOneByTag(tagId);
  }

  @Post()
  public create(@Body() user: UserModel): Promise<Number> {
    return this.usersService.create(user);
  }

  @Delete(':id')
  public delete(@Param('id', ParseIntPipe) id: number): void {
    this.usersService.delete(id);
  }
  @Put(':id')
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UserModel,
  ): UserModel {
    return this.usersService.update(id, user);
  }

  @Post('login')
  public login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    return this.usersService.login(loginDto);
  }
}