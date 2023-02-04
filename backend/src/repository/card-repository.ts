import { CardEntity } from "../database/entity/card";
import { GenericRepository } from "./generic-repository";

export class CardRepository extends GenericRepository<CardEntity> {
  constructor() {
    super(CardEntity);
  }

  async getFullCardById(id: number): Promise<CardEntity | null> {
    return this.repository.findOne({
      where: { id: id },
      relations: {
        cardTypeId: true,
      },
    });
  }
}
