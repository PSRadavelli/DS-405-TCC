import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Package {
  @PrimaryGeneratedColumn()
  @Column({type: 'int', primary: true, nullable: false,})
  id: number;
  
  @Column({ type: 'int', nullable: false })
  userId: number;

  @Column({ type: 'varchar', length: 10, nullable: false })
  status: string;

  @Column({ type: 'date', nullable: false })
  receivementDate: string;

  @Column({ type: 'date', nullable: false })
  takeOffDate: string;
}