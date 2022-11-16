import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Package {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int', nullable: false })
  userId: number;

  @Column({ type: 'bool' })
  retrieved: boolean;

  @Column({ type: 'date', nullable: false })
  receivementDate: string;

  @Column({ type: 'date', nullable: true })
  retrievalDate: string;
}
