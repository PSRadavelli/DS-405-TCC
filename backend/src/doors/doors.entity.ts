import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Door {
  @PrimaryGeneratedColumn( {type: 'int'} )
  id: number;

  @Column({ type: 'int', unique: true, nullable: true })
  packageId: number;

  @Column({ type: 'varchar', nullable: false })
  size: string;

  @Column({type: 'int', unique:false, nullable: false})
  doorNumber: number;
}
