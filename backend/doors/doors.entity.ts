import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Door {
  @PrimaryGeneratedColumn()
  @Column({ type: 'int', nullable: false, unique: true, primary: true })
  packageNumber: number;

  @Column({ type: 'int', unique: true, nullable: true })
  packageId: number;

  @Column({ type: 'varchar', nullable: false })
  size: number;

  @Column({type: 'int', unique:true, nullable: false})
  id: string;
}
