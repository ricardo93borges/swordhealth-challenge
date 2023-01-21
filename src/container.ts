import jwt from "jsonwebtoken";
import { DataSource } from "typeorm";
import config from "./config";
import { User } from "./models/user";
import { Task } from "./models/task";
import { TaskRepository } from "./repositories/task.repository";
import { UserRepository } from "./repositories/user.repository";
import { AuthService } from "./services/auth.service";
import { TaskService } from "./services/task.service";
import { UserService } from "./services/user.service";
import { AuthController } from "./controllers/auth.controller";
import { TaskController } from "./controllers/task.controller";
import { UserController } from "./controllers/user.controller";

export interface Container {
  taskService: TaskService;
  userService: UserService;
  authService: AuthService;
  authController: AuthController;
  taskController: TaskController;
  userController: UserController;
}

export function initializeContainer(dataSource: DataSource) {
  const taskRepository = new TaskRepository(dataSource);
  const userRepository = new UserRepository(dataSource);

  const authService = new AuthService();
  const userService = new UserService(userRepository, authService);
  authService.setUserService(userService);
  const taskService = new TaskService(taskRepository);

  const authController = new AuthController(authService);
  const userController = new UserController(userService);
  const taskController = new TaskController(taskService);

  const container = {
    authService,
    userService,
    taskService,
    authController,
    taskController,
    userController,
  };

  return container;
}
