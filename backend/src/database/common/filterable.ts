import { BaseEntity } from "../entity/baseEntity";

export class Filter<T extends BaseEntity> {
    public pageSize?: number;
    public page?: number;
    public data?: T;
}