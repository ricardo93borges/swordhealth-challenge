import { Router } from "express";
import { Container } from "../container";
import { AuthController } from "../controllers/auth.controller";

export default class AuthRouter {
  private router: Router;
  private container: Container;
  private authController: AuthController;

  constructor(container: Container) {
    this.authController = container.authController;

    this.router = Router();
  }

  getRouter() {
    this.router.post("/login", this.authController.login);

    return this.router;
  }
}
