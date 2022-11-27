import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { DoorModule } from './doors/doors.module';
import { UsersModule } from './users/users.module';
import { PackagesModule } from './packages/packages.module';
import { DoorRequestModule } from './doorRequest/doorRequest.module';
import { LogsModule } from './logs/logs.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'bcgbxjt5egdi7btdi00h-mysql.services.clever-cloud.com',
      port: 3306,
      username: 'uc3umelmy8unxg25',
      password: '5rhNGtreHDDdWa3yhevM',
      database: 'bcgbxjt5egdi7btdi00h',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
    }),
    DoorModule,
    UsersModule,
    PackagesModule,
    DoorRequestModule,
    LogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
