import { DataSource } from "typeorm";
import { Door } from "./doors.entity";

export const doorsProviders = [
  {
    provide: 'DOORS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Door),
    inject: [DataSource],
  },
];