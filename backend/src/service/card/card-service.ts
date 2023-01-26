import { CardRepository } from "../../repository/card-repository";
import fetch from "node-fetch";

export class CardService {
  private readonly accessToken: string = "";

  constructor(private cardRepository: CardRepository) {}

  getAccessTokenForBattleNet() {}

  get token() {
    return this.accessToken;
  }
}
