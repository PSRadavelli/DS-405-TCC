import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()

export class Door{
    @PrimaryGeneratedColumn()
    @Column()
    packageId: Int16Array;
    size: CharacterData;
}
