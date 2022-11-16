import { DataSource } from "typeorm";
import { Package } from "./packages.entity";

export const packagesProviders = [
  {
    provide: 'PACKAGES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Package),
    inject: [DataSource],
  },
];