import { DataSource, Repository } from "typeorm";
import { User } from "../models/user";

export class UserRepository {
  private repository: Repository<User>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(User);
  }

  async add(addUserDTO: Partial<User>): Promise<User> {
    const user = await this.repository.save(addUserDTO);
    return user;
  }

  async find(options?: object): Promise<User[]> {
    const users = await this.repository.find(options);
    return users;
  }

  async findOne(options: object): Promise<User | null> {
    const user = await this.repository.findOne(options);
    return user;
  }
}
