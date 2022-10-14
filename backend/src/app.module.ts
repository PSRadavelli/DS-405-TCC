import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { DoorModule } from './doors/doors.module';
import { UsersModule } from './users/users.module';
import { PackagesModule } from './packages/packages.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'bjxf6affweanqsfftcun-mysql.services.clever-cloud.com',
      port: 3306,
      username: 'upifprdylotsl8fz',
      password: 'BrFVbqHBcCJSVRuiqcTQ',
      database: 'bjxf6affweanqsfftcun',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
    }),
    DoorModule,
    UsersModule,
    PackagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
