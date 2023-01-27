import { RarityEntity } from "../database";
import { GenericRepository } from "./generic-repository";

export class RarityRepository extends GenericRepository<RarityEntity> {
  constructor() {
    super(RarityEntity);
  }
}
