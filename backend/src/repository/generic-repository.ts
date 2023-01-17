import { Connection, Repository, EntityTarget, DeleteResult, UpdateResult, FindOptionsWhere } from 'typeorm';
import { appDataSource, UserEntity } from "../database";
import { IUserRepository } from "./user-repository";
import { BaseEntity } from '../database/entity/baseEntity';
import { Filter } from '../database/common/filterable';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface IGenericRepository<T extends BaseEntity> {
  create(data: T): Promise<T>;
  update(id:number, data:QueryDeepPartialEntity<T>): Promise<UpdateResult>;
  list(): Promise<T[]>;
  deleteById(id:number): Promise<DeleteResult>;
  filter(filter: Filter<T>): Promise<T[]>
}


export class GenericRepository<T extends BaseEntity> implements IGenericRepository<T>{
   private repository: Repository<T>;

   constructor(repo: EntityTarget<T>) {
      this.repository = appDataSource.getRepository<T>(repo);
   }

    async filter(filter: Filter<T>) {
       ///tuto napisat globalny filter, na vstupe vies pagesize, page, a vies dostat zoznam fieldov na ktore si nastavil filtre 
       return this.repository.find();
    }

    async create(data: T): Promise<T> {
       return this.repository.save(data);
    }

    async update(id:number, data:QueryDeepPartialEntity<T>): Promise<UpdateResult> {
       return this.repository.update(id, data)
    }

    async deleteById(id: number): Promise<DeleteResult> {
       return this.repository.delete(id);
    }

   public async list(): Promise<T[]> {
      return await this.repository.find();
   }

}

export class UserRepositoryV2 extends GenericRepository<UserEntity>{

    constructor() {
        super(UserEntity);
    }
}

