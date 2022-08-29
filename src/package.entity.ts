import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { DataTypeDefaults } from 'typeorm/driver/types/DataTypeDefaults';

@Entity()

export class Package{
    @PrimaryGeneratedColumn()
    @Column()
    usuarioId: Int16Array;

    @Column()
    status: Int16Array;

    @Column()
    receivementDate: DataTypeDefaults;

    @Column()
    takeOffDate: DataTypeDefaults;
}
