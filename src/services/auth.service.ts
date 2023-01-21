import bcrypt from "bcrypt";
import config from "../config/index";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserService } from "./user.service";

export class AuthService {
  private userService: UserService;

  setUserService(userService: UserService) {
    this.userService = userService;
  }

  async hash(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  async compare(password: string, hash: string): Promise<boolean> {
    const result = await bcrypt.compare(password, hash);
    return result;
  }

  authenticate(token: string): string | JwtPayload {
    return jwt.verify(token, config.auth.secret);
  }

  async login(email: string, password: string): Promise<string | null> {
    const user = await this.userService.getByEmail(email);

    if (user) {
      const isEqual = await this.compare(password, user.password);

      if (isEqual) {
        const { id, name, email, role } = user;
        const token = jwt.sign({ id, name, email, role }, config.auth.secret);

        return token;
      }
    }

    return null;
  }
}
