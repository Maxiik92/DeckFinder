import { BaseEntity } from "../entity/baseEntity";
import {DeepPartial} from "typeorm";

export class Filter<T extends BaseEntity> {
    public pageSize?: number;
    public page?: number;
    public data?: T;
}