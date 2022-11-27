import { Module } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { PackagesController } from './packages.controller';
import { packagesProviders } from './packages.provider';
import { doorsProviders } from '../doors/doors.provider';

@Module({
  providers: [PackagesService, ...packagesProviders, ...doorsProviders],
  controllers: [PackagesController],
  exports: [PackagesService],
})
export class PackagesModule {}
