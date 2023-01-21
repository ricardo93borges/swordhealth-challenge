import config from "./config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Task } from "./models/task";
import { User } from "./models/user";

export class Database {
  private dataSource: DataSource;

  async connect() {
    const appDataSource = new DataSource({
      type: "mysql",
      host: config.database.host,
      port: 3306,
      username: config.database.user,
      password: config.database.password,
      database: config.database.name,
      entities: [Task, User],
      synchronize: true,
      logging: false,
    });

    await appDataSource.initialize();

    console.info("database connected.");

    this.dataSource = appDataSource;
  }

  getDataSource() {
    return this.dataSource;
  }
}
