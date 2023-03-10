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
import jwt from "jsonwebtoken";
import config from "../../../config/config";

export class UserService {
  privateKey = config.privateKey;
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

  async checkUser(user: UserEntity): Promise<CustomResponse<UserEntity>> {
    const checkedUserName = await this.checkUserInput("name", user.name!);
    if (checkedUserName.status != 200) {
      return checkedUserName;
    }
    const checkedUserMail = await this.checkUserInput("email", user.email!);
    if (checkedUserMail.status != 200) {
      return checkedUserMail;
    }
    return {
      status: 200,
      message: "OK",
      data: {},
    };
  }

  async checkUserInput(
    inputType: string,
    userInput: string
  ): Promise<CustomResponse<Object>> {
    const checkedUserInput = await this.userRepository.getUser(
      inputType,
      userInput
    );
    if (checkedUserInput != null) {
      return {
        status: 400,
        message: `User ${inputType} allready in use.`,
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

  async login(login: Login): Promise<CustomResponse<UserEntity>> {
    const loginType = this.checkIfItsAnEmailOrUserName(login.login);
    const foundUser = await this.userRepository.getUser(loginType, login.login);
    if (!foundUser) {
      return {
        status: 400,
        message: "User Name/ Email not found.",
        data: {},
      };
    }
    const isPasswordValid = await bcrypt.compare(
      login.password,
      foundUser.password!
    );
    if (!isPasswordValid) {
      return { status: 400, message: "Invalid Password", data: {} };
    }
    const token = this.createAccessToken(foundUser);
    return { status: 200, message: "OK", token: token, data: {} };
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

  createAccessToken(user: UserEntity): string {
    return jwt.sign({ id: user.id, name: user.name }, this.privateKey, {
      expiresIn: config.tokenExpiry,
      algorithm: "RS256",
    });
  }
}
