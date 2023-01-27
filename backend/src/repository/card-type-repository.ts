import { CardTypeEntity } from "../database";
import { GenericRepository } from "./generic-repository";

export class CardTypeRepository extends GenericRepository<CardTypeEntity> {
  constructor() {
    super(CardTypeEntity);
  }
}
