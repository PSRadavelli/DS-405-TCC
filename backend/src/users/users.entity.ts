import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User { 
  @PrimaryGeneratedColumn({ type: 'int' })
  userId: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  surname: string;

  @Column({ type: 'int', nullable: false })
  age: number;

  @Column({ type: 'varchar', length: 11 })
  telephone: number;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'boolean', default: false, nullable: false })
  admin: boolean;

  @Column({ type: 'varchar', default: false, nullable: false, unique: true })
  tagId: string;

  @Column({ nullable: false })
  appNotification: boolean;

  @Column({ nullable: false })
  emailNotification: boolean;

  @Column({ nullable: false })
  intercomNotification: boolean;
}
