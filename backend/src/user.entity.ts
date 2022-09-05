import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  tag: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  lastName: string;

  @Column({ type: 'int', nullable: false })
  age: number;

  @Column({ type: 'varchar', length: 11 })
  telephone: number;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'boolean', default: false, nullable: false })
  admin: boolean;

  @Column({ nullable: false })
  appNotification: boolean;

  @Column({ nullable: false })
  emailNotification: boolean;

  @Column({ nullable: false })
  intercomNotification: boolean;
}
