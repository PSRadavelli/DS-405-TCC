import { DataSource } from "typeorm";
import { DoorRequest } from "./doorRequest.entity";

export const doorRequestProviders = [
  {
    provide: 'DOOR_REQUEST_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(DoorRequest),
    inject: [DataSource],
  },
];