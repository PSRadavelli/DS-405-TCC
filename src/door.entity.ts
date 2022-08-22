import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { DataTypeDefaults } from 'typeorm/driver/types/DataTypeDefaults';

@Entity()

export class Door{
    @PrimaryGeneratedColumn()
    @Column()
    packageId: Int16Array;
    size: CharacterData;
}
