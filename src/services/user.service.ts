import { User } from "../models/user";
import { UserRepository } from "../repositories/user.repository";
import { AuthService } from "./auth.service";

export class UserService {
  private userRespository: UserRepository;
  private authService: AuthService;

  constructor(userRespository: UserRepository, authService: AuthService) {
    this.userRespository = userRespository;
    this.authService = authService;
  }

  async add(addUserDTO: Partial<User>): Promise<User> {
    addUserDTO.password = await this.authService.hash(addUserDTO.password!);

    const user = await this.userRespository.add(addUserDTO);
    return user;
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await this.userRespository.findOne({ where: { email } });
    return user;
  }

  async get(): Promise<User[]> {
    const users = await this.userRespository.find();
    return users;
  }
}
