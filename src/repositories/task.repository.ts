import { DataSource, Repository } from "typeorm";
import { Task } from "../models/task";

export class TaskRepository {
  private dataSource: DataSource;
  private repository: Repository<Task>;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
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

  async findOne(options: object): Promise<Task | null> {
    const task = await this.repository.findOne(options);
    return task;
  }

  async update(criteria: object, data: object): Promise<number | undefined> {
    const result = await this.repository.update(criteria, data);
    return result.affected;
  }

  async updateWithUser(
    id: string,
    userId: number,
    data: object
  ): Promise<number | undefined> {
    const result = await this.dataSource
      .createQueryBuilder()
      .update(Task)
      .set(data)
      .where("id = :id AND user.id = :userId", { id, userId })
      .execute();

    return result.affected;
  }
}
