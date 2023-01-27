import { SetEntity } from "../database";
import { GenericRepository } from "./generic-repository";

export class SetRepository extends GenericRepository<SetEntity> {
  constructor() {
    super(SetEntity);
  }
}
