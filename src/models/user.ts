import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
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

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: Role,
    default: Role.TECHNICIAN,
  })
  role: Role;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  public updatedAt: Date;
}
