import { Connection, Repository, EntityTarget } from 'typeorm';
import { appDataSource } from "../database";
import { IUserRepository } from "./user-repository";

export interface IGenericRepository<T> {
  create(data: T): Promise<T>;
  update(id:number, data:T): Promise<T>;
  list(): Promise<T[]>;
  deleteById(id:number): Promise<T>;
}


export class GenericService<T> implements IGenericRepository<T>{
   private repository: Repository<T>;

   constructor(connection: Connection, repo: EntityTarget<T>) {
      this.repository = appDataSource.getRepository<T>(repo);
   }

    async create(data: T): Promise<T> {
       return this.repository.save(data);
    }

    async update(id: number, data: T): Promise<T> {
        return this.repository.update(id, data);
    }

    async deleteById(id: number): Promise<T> {
       return this.repository.delete({ id });
    }

   public async list(): Promise<T[]> {
      return await this.repository.find();
   }

}

