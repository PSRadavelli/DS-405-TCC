import { Module } from '@nestjs/common';
import { DoorsService } from './doors.service';
import { DoorController } from './doors.controller';
import { doorsProviders } from './doors.provider';
import { usersProviders } from '../users/users.providers';
import { doorRequestProviders } from '../doorRequest/doorRequest.provider';
import { logsProviders } from '../logs/logs.providers';
import { packagesProviders } from '../packages/packages.provider';

@Module({
  providers: [
    DoorsService,
    ...doorsProviders,
    ...usersProviders,
    ...doorRequestProviders,
    ...logsProviders,
    ...packagesProviders, 
  ],
  controllers: [DoorController],
  exports: [DoorsService],
})
export class DoorModule {}
