import { ValidationError } from "joi";
import { UserEntity } from "../../database";
import { userSchema } from "./user-schema";
import log from "../../logger";
import { UserRepository } from "../../repository/user-repository";
import { CustomResponse } from "../../repository/custom-response";
import { UpdateResult } from "typeorm";
import bcrypt from "bcrypt";

export class UserService {
  constructor(public userRepository: UserRepository) {}

  async createUser(user: UserEntity): Promise<CustomResponse> {
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
    const newUser = await this.userRepository.createUser(user);
    delete newUser.password;
    return { status: 200, message: "OK", data: newUser };
  }

  async checkUser(userName: string): Promise<CustomResponse> {
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

  async getUser(userId: number): Promise<CustomResponse> {
    const foundUser = await this.userRepository.findUserById(userId);
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

  async updateUser(user: UserEntity, userId: number): Promise<CustomResponse> {
    const updatedUser: UpdateResult = await this.userRepository.updateUser(
      user,
      userId
    );
    return this.successfullUpdateCheck(updatedUser);
  }

  async checkPassword(password: string, id: number) {
    const foundUser = await this.userRepository.findUserById(id);
    if (foundUser == null) {
      return {
        status: 400,
        message: "User with provided id do not exist.",
        data: {},
      };
    }
    return await bcrypt.compare(password, foundUser.password as string);
  }

  async updateUserPassword(newPassword: string, id: number) {
    const updatedPassword = await this.userRepository.updateUserPassword(
      newPassword,
      id
    );
    return this.successfullUpdateCheck(updatedPassword);
  }

  successfullUpdateCheck(update: UpdateResult): CustomResponse {
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

  async deleteUser(id: number): Promise<CustomResponse> {
    const deletedUser = await this.userRepository.deleteUser(id);
    if (deletedUser !== null) {
      if (deletedUser.affected! > 0)
        return { status: 204, message: "OK", data: {} };
    }
    return { status: 500, message: "Delete was not successfull", data: {} };
  }
}
