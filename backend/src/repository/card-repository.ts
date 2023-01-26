import { CardEntity } from "../database/entity/card";
import { GenericRepository } from "./generic-repository";

export class CardRepository extends GenericRepository<CardEntity> {
  constructor() {
    super(CardEntity);
  }
}
