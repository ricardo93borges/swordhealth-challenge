import config from "./config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Task } from "./models/task";
import { User } from "./models/user";

export function connectDatabase() {
  const AppDataSource = new DataSource({
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

  AppDataSource.initialize()
    .then(() => {
      console.log("database connected.");
    })
    .catch((error) => console.log(error));
}
