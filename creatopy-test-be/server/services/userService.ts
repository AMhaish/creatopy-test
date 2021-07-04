const bcrypt = require("bcrypt-nodejs");
import UserRepo from "../repositories/usersRepo";
import LoggingService from "./loggingService";
import EntityNotExistException from "../exceptions/business/entityNotExistException";
import EntityExistException from "../exceptions/business/entityExistException";
import User from "../models/user";
import { Utils } from "../utils/utils";
import { UserInstance } from "../../db/models/user";
import { v4 } from "uuid";
import PasswordResetTokenInvalidException from "../exceptions/business/passwordResettokenInvalidException";
import { cryptPassword } from "../../db/models/user";
import BusinessException from "../exceptions/business/businessException";

export default class UserService {
  constructor(
    private logger: LoggingService,
    private userRepo: UserRepo,
  ) {
  }

  async getUser(id: string): Promise<User> {
    let user = await this.userRepo.findOne(id);
    if (user) {
      return {
        email: user.email,
        id: user.id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } else {
      throw new EntityNotExistException("User not found");
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    let user = await this.userRepo.findOneByField(email, Utils.nameOf<User>("email"));
    if (user) {
      return {
        email: user.email,
        id: user.id,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        resetPassToken: user.resetPassToken,
      };
    } else {
      return null;
    }
  }

  async createUser(user: User): Promise<User> {
    this.logger.logInfo(`Registering a new user inside the system with email: ${user.email}`, UserService.name);
    if (user.password) {
      const result = await this.userRepo.create({
        email: user.email,
        password: user.password,
        resetPassToken: "",
      });
      return {
        email: result.email,
        createdAt: result.createdAt,
        id: result.id,
        updatedAt: result.updatedAt
      };
    }
    throw new BusinessException("Password is not provided");
  }

  async generateResetPasswordToken(user: User): Promise<string> {
    let token: string = v4();
    if (user.id && user.password) {
      await this.userRepo.update(user.id, {
        email: user.email,
        password: user.password,
        resetPassToken: token,
        resetPassExpires: Date.now() + 3600000 // 1 hour
      });
    } else {
      throw new EntityNotExistException("User not found");
    }
    return token;
  }

  async findUserByForgetPasswordToken(resetPassToken: string): Promise<User> {
    let user = await this.userRepo.findOneByField(resetPassToken, Utils.nameOf<User>("resetPassToken"));
    if (user?.resetPassExpires && user?.resetPassExpires > Date.now()) {
      return user;
    }
    throw new PasswordResetTokenInvalidException();
  }

  async updateUserPassword(user: User, password: string): Promise<void> {
    const hashedPassword: string = await cryptPassword(password);
    if (user.id && user.password) {
      await this.userRepo.update(user.id, {
        email: user.email,
        password: hashedPassword,
        resetPassToken: ""
      });
    } else {
      throw new EntityNotExistException("User not found");
    }
  }
}



