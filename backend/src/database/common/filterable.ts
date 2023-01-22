import { FindOptionsWhere } from "typeorm";

export interface IFilterable<T> {
  getAsKeyValue(): FindOptionsWhere<T>; // return key value type
}

export class Filter<T extends IFilterable<T>> {
  public pageSize?: number;
  public page?: number;
  public data?: T;
}
