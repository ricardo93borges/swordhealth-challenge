import config from "../config";
import { AMQP } from "../amqp/amqp";
import { Role, User } from "../models/user";
import { Status, Task } from "../models/task";
import { TaskRepository } from "../repositories/task.repository";

export class TaskService {
  private taskRespository: TaskRepository;
  private amqp: AMQP;

  constructor(taskRespository: TaskRepository, amqp: AMQP) {
    this.taskRespository = taskRespository;
    this.amqp = amqp;
  }

  async add(addTaskDTO: Partial<Task>): Promise<Task> {
    const task = await this.taskRespository.add(addTaskDTO);
    return task;
  }

  async get(user: User): Promise<Task[]> {
    let tasks: Task[] = [];
    if (user.role === Role.MANAGER) {
      tasks = await this.taskRespository.find();
    } else if (user.role === Role.TECHNICIAN) {
      tasks = await this.taskRespository.find({
        where: { "user.id": user.id },
      });
    }
    return tasks;
  }

  async update(
    user: User,
    id: string,
    updateTaskDTO: Partial<Task>
  ): Promise<Task | null> {
    const { summary, status, date } = updateTaskDTO;
    let updated;
    let options;

    if (user.role === Role.MANAGER) {
      options = {
        where: { id },
      };
    } else {
      options = {
        where: {
          id,
          "user.id": user.id,
        },
      };
    }

    const task = await this.taskRespository.findOne(options);

    if (!task) return null;

    if (user.role === Role.MANAGER) {
      updated = await this.taskRespository.update(
        { id: id },
        { summary, status, date }
      );
    } else if (user.role === Role.TECHNICIAN) {
      updated = await this.taskRespository.updateWithUser(id, user.id, {
        summary,
        status,
        date,
      });
    }

    const updatedTask = await this.taskRespository.findOne({
      relations: { user: true },
      where: { id },
    });

    if (
      updated &&
      updated > 0 &&
      task.status !== Status.FINISHED &&
      status === Status.FINISHED
    ) {
      await this.amqp.send(config.amqp.queues.finishedTasks!, updatedTask!);
    }

    return updatedTask;
  }
}
