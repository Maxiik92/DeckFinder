import { DeleteResult, UpdateResult } from "typeorm";
import { appDataSource } from "../database";
import { UserEntity } from "../database";
import { genSaltSync, hashSync } from "bcrypt";

export interface IUserRepository {
  createUser(user: UserEntity): Promise<UserEntity>;
}

export class UserRepository implements IUserRepository {
  async createUser(user: UserEntity): Promise<UserEntity> {
    const newUser = new UserEntity();
    const hash = this.passwordHashing(user.password!);

    newUser.name = user.name;
    newUser.password = hash;
    newUser.email = user.email;

    return appDataSource.getRepository(UserEntity).save(newUser);
  }

  async checkUser(userName: string): Promise<UserEntity | null> {
    return appDataSource
      .getRepository(UserEntity)
      .createQueryBuilder("user")
      .where(`user.name = :name`, { name: userName })
      .getOne();
  }

  async findUserById(userId: number): Promise<UserEntity | null> {
    return appDataSource.getRepository(UserEntity).findOneBy({
      id: userId,
    });
  }

  async updateUser(user: UserEntity, userId: number): Promise<UpdateResult> {
    return appDataSource.getRepository(UserEntity).update(userId, {
      name: user.name,
      email: user.email,
    });
  }

  async updateUserPassword(
    newPassword: string,
    id: number
  ): Promise<UpdateResult> {
    const hash: string = this.passwordHashing(newPassword);
    return appDataSource.getRepository(UserEntity).update(id, {
      password: hash,
    });
  }

  async deleteUser(id: number): Promise<DeleteResult> {
    return appDataSource
      .createQueryBuilder()
      .delete()
      .from(UserEntity)
      .where("id=:id", { id: id })
      .execute();
  }

  passwordHashing(password: string): string {
    const saltRounds = 10;
    const salt = genSaltSync(saltRounds);
    return hashSync(password!, salt);
  }
}
