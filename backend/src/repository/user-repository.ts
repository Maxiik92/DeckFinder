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
  // user can login via email/username and service decides what type is it
  async getUser(logintype: string, input: string): Promise<UserEntity | null> {
    return this.repository
      .createQueryBuilder("user")
      .where(`user.${logintype}=:${logintype}`, { [logintype]: input })
      .getOne();
  }
}
