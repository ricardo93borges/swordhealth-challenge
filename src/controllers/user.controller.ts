import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  get = async (req: Request, res: Response) => {
    const users = await this.userService.get();
    res.send(users);
  };

  add = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password, role } = req.body;
    const user = await this.userService.add({ name, email, password, role });
    res.send(user);
  };
}
