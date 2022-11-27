import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class DoorRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  doorId: number;

  @Column()
  doorNumber: number;
}