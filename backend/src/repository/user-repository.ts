import { UserEntity } from "../database";
import { Login } from "../interfaces/login";
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
  //.where(`user.${logintype} =:${logintype}`,{`${logintype}`:login.login})
  async getUser(logintype: string, login: Login): Promise<UserEntity | null> {
    return this.repository
      .createQueryBuilder("user")
      .where(`user.${logintype}=:${logintype}`, { [logintype]: login.login })
      .getOne();
  }
}
