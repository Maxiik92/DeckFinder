import { CardEntity } from "../database/entity/card";

export interface CardResponse {
  cards: CardEntity[];
  cardCount: number;
  pageCount: number;
  page: number;
}
