import { Router } from "express";
import { Container } from "../container";
import { UserController } from "../controllers/user.controller";

export default class UserRouter {
  private router: Router;
  private container: Container;
  private userController: UserController;

  constructor(container: Container) {
    this.userController = container.userController;

    this.router = Router();
  }

  getRouter() {
    this.router.get("/", this.userController.get);
    this.router.post("/", this.userController.add);

    return this.router;
  }
}
