import { Module } from '@nestjs/common';
import { DoorsService } from './doors.service';
import { DoorController } from './doors.controller';

@Module({
  providers: [DoorsService],
  controllers: [DoorController],
  exports: [DoorsService],
})
export class DoorModule {}
