import { Router } from "express";
import { auth } from "../middlewares/auth.middleware";
import { TaskController } from "../controllers/task.controller";
import { Container } from "../container";

export default class TaskRouter {
  private router: Router;
  private container: Container;
  private taskController: TaskController;

  constructor(container: Container) {
    this.container = container;
    this.taskController = container.taskController;

    this.router = Router();
  }

  getRouter() {
    this.router.get("/", auth(this.container), this.taskController.get);
    this.router.get("/:id", auth(this.container), this.taskController.getById);
    this.router.post("/", auth(this.container), this.taskController.add);
    this.router.put("/:id", auth(this.container), this.taskController.update);

    return this.router;
  }
}
