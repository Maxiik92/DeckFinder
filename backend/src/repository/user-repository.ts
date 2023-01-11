import { appDataSource } from "../database";
import { UserEntity } from "../database";
import { genSaltSync, hashSync } from "bcrypt";

export interface IUserRepository {
  createUser(user: UserEntity): Promise<UserEntity>;
}

export class UserRepository implements IUserRepository {
  async createUser(user: UserEntity): Promise<UserEntity> {
    const newUser = new UserEntity();
    const saltRounds = 10;
    const salt = genSaltSync(saltRounds);
    const hash = hashSync(user.password!, salt);

    newUser.name = user.name;
    newUser.password = hash;
    newUser.email = user.email;

    return appDataSource.getRepository(UserEntity).save(newUser);
  }
}
