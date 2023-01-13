import { ValidationError } from "joi";
import { UserEntity } from "../../database";
import { userSchema } from "./user-schema";
import log from "../../logger";
import { inputValidation } from "../index";
import { UserRepository } from "../../repository/user-repository";
import { CustomResponse } from "../../repository/custom-response";

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
          data: [],
        };
      }
    }
    const newUser = await this.userRepository.createUser(user);
    return { status: 200, message: "OK", data: newUser };
  }

  async checkUser(userName: string): Promise<CustomResponse> {
    const checkedUser = await this.userRepository.checkUser(userName);
    if (checkedUser !== null) {
      return {
        status: 400,
        message: "UserName allready in use.",
        data: [],
      };
    }
    return {
      status: 200,
      message: "OK",
      data: [],
    };
  }

  async getUser(userId: number): Promise<CustomResponse> {
    const foundUser = await this.userRepository.findUserById(userId);
    if (foundUser == null) {
      return {
        status: 400,
        message: "User with provided id do not exist.",
        data: [],
      };
    }
    return {
      status: 200,
      message: "OK",
      data: foundUser,
    };
  }
}
