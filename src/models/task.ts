import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user";

export enum Status {
  PENDING = "PENDING",
  FINISHED = "FINISHED",
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  summary: string;

  @Column({ type: "timestamp" })
  date: Date;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

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
