import { DeleteResult, UpdateResult } from "typeorm";
import { appDataSource } from "../database";
import { UserEntity } from "../database";
import { GenericRepository } from "./generic-repository";

export class UserRepository extends GenericRepository<UserEntity> {
  constructor() {
    super(UserEntity);
  }

  async checkUser(userName: string): Promise<UserEntity | null> {
    return this.repository
      .createQueryBuilder("user")
      .where(`user.name = :name`, { name: userName })
      .getOne();
  }

  // async findUserById(userId: number): Promise<UserEntity | null> {
  //   return this.repository.findOneBy({
  //     id: userId,
  //   });
  // }
}
