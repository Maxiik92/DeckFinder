import { ValidationError } from "joi";
import { UserEntity } from "../../database";
import { userSchema } from "./user-schema";
import log from "../../logger";
import { UserRepository } from "../../repository/user-repository";
import { CustomResponse } from "../../interfaces/custom-response";
import { UpdateResult } from "typeorm";
import bcrypt from "bcrypt";
import { genSaltSync, hashSync } from "bcrypt";
import { Login } from "../../interfaces/login";

export class UserService {
  constructor(public userRepository: UserRepository) {}

  async createUser(user: UserEntity): Promise<CustomResponse<UserEntity>> {
    try {
      await userSchema.validateAsync(user);
    } catch (err) {
      if (err instanceof ValidationError) {
        log.error("Input provided is not valid. Error:" + err);
        return {
          status: 422,
          message: "Input provided is not valid.",
          data: {},
        };
      }
    }
    user.password = this.passwordHashing(user.password!);
    const newUser = await this.userRepository.create(user);
    delete newUser.password;
    return { status: 200, message: "OK", data: newUser };
  }

  async checkUser(userName: string): Promise<CustomResponse<UserEntity>> {
    const checkedUser = await this.userRepository.checkUser(userName);
    if (checkedUser !== null) {
      return {
        status: 400,
        message: "UserName allready in use.",
        data: {},
      };
    }
    return {
      status: 200,
      message: "OK",
      data: {},
    };
  }

  async getUserbyId(userId: number): Promise<CustomResponse<UserEntity>> {
    const foundUser = await this.userRepository.getById(userId);
    if (foundUser == null) {
      return {
        status: 400,
        message: "User with provided id do not exist.",
        data: {},
      };
    }
    delete foundUser.password;
    return {
      status: 200,
      message: "OK",
      data: foundUser,
    };
  }

  async getUserByLogin(login: Login): Promise<UserEntity | null> {
    const loginType = this.checkIfItsAnEmailOrUserName(login.login);
    return await this.userRepository.getUser(loginType, login);
  }

  async updateUser(
    user: UserEntity,
    userId: number
  ): Promise<CustomResponse<UserEntity>> {
    const update: UpdateResult = await this.userRepository.update(userId, user);
    return this.successfullUpdateCheck(update);
  }

  async checkPassword(password: string, id: number) {
    const foundUser = await this.userRepository.getById(id);
    if (foundUser == null) {
      return {
        status: 400,
        message: "User with provided id do not exist.",
        data: {},
      };
    }
    return await bcrypt.compare(password, foundUser.password as string);
  }

  async updateUserPassword(password: string, id: number) {
    const newPassword = { password: this.passwordHashing(password) };
    const update = await this.userRepository.update(id, newPassword);
    return this.successfullUpdateCheck(update);
  }

  successfullUpdateCheck(update: UpdateResult): CustomResponse<UserEntity> {
    if (update.affected! < 1) {
      return {
        status: 500,
        message: "Updating was not successfull.",
        data: {},
      };
    }
    return {
      status: 200,
      message: "OK",
      data: {},
    };
  }

  async deleteUser(id: number): Promise<CustomResponse<{}>> {
    const deletedUser = await this.userRepository.deleteById(id);
    if (deletedUser !== null) {
      if (deletedUser.affected! > 0)
        return { status: 204, message: "OK", data: {} };
    }
    return { status: 500, message: "Delete was not successfull", data: {} };
  }

  passwordHashing(password: string): string {
    const saltRounds = 10;
    const salt = genSaltSync(saltRounds);
    return hashSync(password!, salt);
  }

  checkIfItsAnEmailOrUserName(loginType: string): string {
    const emailRegexp: RegExp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (loginType.match(emailRegexp)) {
      return "email";
    }
    return "name";
  }
}
