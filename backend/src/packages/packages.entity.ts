import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Package {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int', nullable: false })
  userId: number;

  @Column({ type: 'varchar', length: 10 })
  status: string;

  @Column({ type: 'date', nullable: false })
  receivementDate: string;

  @Column({ type: 'date', nullable: false })
  takeOffDate: string;
}
