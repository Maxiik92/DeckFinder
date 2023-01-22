import { Repository, EntityTarget, DeleteResult, UpdateResult } from "typeorm";
import { appDataSource } from "../database";
import { BaseEntity } from "../database/entity/baseEntity";
import { Filter } from "../database/common/filterable";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export interface IGenericRepository<T extends BaseEntity> {
  create(data: T): Promise<T>;
  update(id: number, data: QueryDeepPartialEntity<T>): Promise<UpdateResult>;
  list(): Promise<T[]>;
  deleteById(id: number): Promise<DeleteResult>;
  //filter(filter: Filter<T>): Promise<T[]>;
  getById(searchId: number): Promise<T | null>;
}

export class GenericRepository<T extends BaseEntity>
  implements IGenericRepository<T>
{
  protected repository: Repository<T>;

  constructor(repo: EntityTarget<T>) {
    this.repository = appDataSource.getRepository<T>(repo);
  }

  async getById(searchId: number): Promise<T | null> {
    return this.repository
      .createQueryBuilder()
      .where(`id = :searchId`, { searchId: searchId })
      .getOne();
  }
  /*
  async filter(filter: Filter<T>) {
    ///tuto napisat globalny filter, na vstupe vies pagesize, page, a vies dostat zoznam fieldov na ktore si nastavil filtre
    return this.repository.findMany(filter.data);
  }*/

  async create(data: T): Promise<T> {
    return this.repository.save(data);
  }

  async update(
    id: number,
    data: QueryDeepPartialEntity<T>
  ): Promise<UpdateResult> {
    return this.repository.update(id, data);
  }

  async deleteById(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  public async list(): Promise<T[]> {
    return await this.repository.find();
  }
}
