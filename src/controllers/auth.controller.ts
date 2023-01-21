import { Request, Response } from "express";
import { ErrorCode } from "../utils/error-codes";
import { AuthService } from "../services/auth.service";

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const token = await this.authService.login(email, password);

    if (!token) {
      res
        .status(401)
        .send({ error: ErrorCode.UNAUTHORIZED_ERROR, message: "unauthorized" });
    } else {
      res.send(token);
    }
  };
}
