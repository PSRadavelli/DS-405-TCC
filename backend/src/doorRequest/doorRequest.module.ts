import { Module } from "@nestjs/common";
import { DoorRequestController } from "./doorRequest.controller";
import { doorRequestProviders } from "./doorRequest.provider";
import { DoorRequestService } from "./doorRequest.service";

@Module({
  providers: [DoorRequestService, ...doorRequestProviders],
  controllers: [DoorRequestController],
  exports: [DoorRequestService],
})

export class DoorRequestModule {}
