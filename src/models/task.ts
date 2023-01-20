import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./user";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  summary: string;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
