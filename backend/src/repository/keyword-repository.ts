import { KeywordEntity } from "../database/";
import { GenericRepository } from "./generic-repository";

export class KeywordRepository extends GenericRepository<KeywordEntity> {
  constructor() {
    super(KeywordEntity);
  }
}
