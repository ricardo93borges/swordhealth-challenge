import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Task } from "./task";

export enum Role {
  MANAGER = "MANAGER",
  TECHNICIAN = "TECHNICIAN",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: "enum",
    enum: Role,
    default: Role.TECHNICIAN,
  })
  role: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
