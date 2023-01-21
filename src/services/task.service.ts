import { Role, User } from "../models/user";
import { Task } from "../models/task";
import { TaskRepository } from "../repositories/task.repository";

export class TaskService {
  private taskRespository: TaskRepository;

  constructor(taskRespository: TaskRepository) {
    this.taskRespository = taskRespository;
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

    if (user.role === Role.MANAGER) {
      await this.taskRespository.update({ id: id }, { summary, status, date });
    } else if (user.role === Role.TECHNICIAN) {
      await this.taskRespository.updateWithUser(id, user.id, {
        summary,
        status,
        date,
      });
    }

    const task = await this.taskRespository.findOne({ where: { id } });
    return task;
  }
}
