import { Container } from "container";
import { NextFunction, Request, Response } from "express";
import { ErrorCode } from "../utils/error-codes";

export const auth = (container: Container) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      const user = container.authService.authenticate(token!);
      req.headers.user = JSON.stringify(user);
      next();
    } catch (err) {
      console.error(err);

      res
        .status(401)
        .send({ error: ErrorCode.UNAUTHORIZED_ERROR, message: "unauthorized" });
    }
  };
};
