import { CardRepository } from "../../repository/card-repository";
import fetch from "node-fetch";
import config from "../../../config/config";
import { BattleNetAccess } from "../../interfaces/battlenet";
import { CardEntity } from "../../database/entity/card";
import log from "../../logger";
import { CardResponse } from "../../interfaces/card-response";
import { ClassRepository } from "../../repository/class-repository";
import { SetRepository } from "../../repository/set-repository";
import { CardTypeRepository } from "../../repository/card-type-repository";
import { RarityRepository } from "../../repository/rarity-repository";
import { KeywordRepository } from "../../repository/keyword-repository";

export class DatabaseService {
  private accessToken: string = "";
  cards: CardEntity[] = [];

  constructor(
    private cardRepository: CardRepository,
    private classRepository: ClassRepository,
    private setRepository: SetRepository,
    private cardTypeRepository: CardTypeRepository,
    private rarityRepository: RarityRepository,
    private keywordRepository: KeywordRepository
  ) {}

  async getAccessTokenForBattleNet() {
    const accessData = `${config.battleNet.clientId}:${config.battleNet.secret}`;
    const encodedData = Buffer.from(accessData, "utf8").toString("base64");
    try {
      const response = await fetch(
        "https://oauth.battle.net/token?grant_type=client_credentials",
        {
          method: "POST",
          headers: {
            authorization: `Basic ${encodedData}`,
          },
        }
      );
      const jsonResponse = (await response.json()) as BattleNetAccess;
      this.accessToken = jsonResponse.access_token;
    } catch {
      (err: Error) => {
        log.error(err);
      };
    }
  }

  async getAllCards(callback: Function) {
    let page = 1;
    let pageCount = 2;
    const url = `https://us.api.blizzard.com/hearthstone/cards?locale=en_US&gameMode=constructed&page=${page}&pageSize=100&access_token=`;
    try {
      for (let i: number = 0; i < pageCount; i++) {
        let errorHappened = false;
        const response = await fetch(url + this.accessToken);
        //may happen if token is not valid
        if (response.status == 401) {
          log.error("Unauthorized access to Battle.Net at getAllCards.");
          errorHappened = true;
          return { error: "Unauthorized." };
        }
        //if token not valid break the for loop
        if (errorHappened) break;

        const jsonResponse = (await response.json()) as CardResponse;
        //if pageCount is still 2 change it to pageCount from response
        if (pageCount != jsonResponse.pageCount) {
          pageCount = jsonResponse.pageCount;
        }
        //callback is to either save all or compare and save
        callback(jsonResponse.cards);
      }
    } catch {
      (err: Error) => {
        log.error(err);
      };
    }
  }

  async saveCards(cards: CardEntity[]) {}

  async getClasses() {
    const url =
      "https://us.api.blizzard.com/hearthstone/metadata/classes?locale=en_US&access_token=";
  }

  async getSets() {
    const url =
      "https://us.api.blizzard.com/hearthstone/metadata/sets?locale=en_US&access_token=";
  }

  async getCardTypes() {
    const url =
      "https://us.api.blizzard.com/hearthstone/metadata/types?locale=en_US&access_token=";
  }

  async getRarities() {
    const url =
      "https://us.api.blizzard.com/hearthstone/metadata/rarities?locale=en_US&access_token=";
  }

  async initDbSetup() {}

  get token() {
    return this.accessToken;
  }
}
