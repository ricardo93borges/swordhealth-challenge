import { DataSource, Repository } from "typeorm";
import { Task } from "../models/task";

export class TaskRepository {
  private repository: Repository<Task>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Task);
  }

  async add(addTaskDTO: Partial<Task>): Promise<Task> {
    const task = await this.repository.save(addTaskDTO);
    return task;
  }

  async find(options?: object): Promise<Task[]> {
    const tasks = await this.repository.find(options);
    return tasks;
  }
}
