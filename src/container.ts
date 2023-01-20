import jwt from "jsonwebtoken";
import config from "./config";
import { User } from "./models/user";
import { Task } from "./models/task";
import { TaskRepository } from "./repositories/task.repository";
import { UserRepository } from "./repositories/user.repository";
import { TaskService } from "./services/task.service";
import { UserService } from "./services/user.service";

export interface Container {
  taskService: TaskService;
  userService: UserService;
}

const taskRepository = new TaskRepository();
const userRepository = new UserRepository();

const userService = new UserService();
const taskService = new TaskService();

const container = {
  userService,
  taskService,
};

export default container;
