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
}
