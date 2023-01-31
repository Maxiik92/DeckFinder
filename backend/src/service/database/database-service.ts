import { CardRepository } from "../../repository/card-repository";
import config from "../../../config/config";
import { BattleNetAccess } from "../../interfaces/battlenet";
import { CardEntity, KeywordEntity, SetEntity } from "../../database";
import log from "../../logger";
import { CardResponse } from "../../interfaces/card-response";
import { ClassRepository } from "../../repository/class-repository";
import { SetRepository } from "../../repository/set-repository";
import { CardTypeRepository } from "../../repository/card-type-repository";
import { RarityRepository } from "../../repository/rarity-repository";
import { KeywordRepository } from "../../repository/keyword-repository";
import { RequestInfo, RequestInit } from "node-fetch";
import { EntityTarget, ObjectLiteral, Repository, Entity } from "typeorm";
const fetch = (url: RequestInfo, init?: RequestInit) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url, init));

export class DatabaseService {
  private accessToken: string = "";
  metadataInfoAndMessages = [
    {
      path: "classes",
      messageInput: "Class",
      repository: this.classRepository,
    },
    {
      path: "sets",
      messageInput: "Set",
      repository: this.setRepository,
    },
    {
      path: "rarities",
      messageInput: "Rarity",
      repository: this.rarityRepository,
    },
    {
      path: "types",
      messageInput: "CardType",
      repository: this.cardTypeRepository,
    },
    {
      path: "keywords",
      messageInput: "Keyword",
      repository: this.keywordRepository,
    },
  ];

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
  /*
  async getAndSaveClasses() {
    const url =
      "https://us.api.blizzard.com/hearthstone/metadata/classes?locale=en_US&access_token=" +
      this.accessToken;
    try {
      const response = await fetch(url);
      const jsonResponse = await response.json();
      const res = await this.classRepository.create(jsonResponse);
      if (res) {
        const message = { message: "Class DB initialisation was successfull." };
        log.info("Class DB initialisation was successfull.");
        return message;
      }
    } catch {
      (err: Error) => {
        const message = { error: "Error in Class DB initialisation " + err };
        log.error(message);
        return message;
      };
    }
  }*/

  async getAndSaveTables(
    pathFragment: string,
    messageInput: string,
    //this have to be refactored
    repo:
      | ClassRepository
      | CardTypeRepository
      | RarityRepository
      | KeywordRepository
      | SetRepository
  ) {
    const url =
      `https://us.api.blizzard.com/hearthstone/metadata/${pathFragment}?locale=en_US&access_token=` +
      this.accessToken;
    try {
      const response = await fetch(url);
      const jsonResponse = await response.json();
      const res = await repo.create(jsonResponse);

      if (res) {
        const message = {
          round: messageInput,
          message: `${messageInput} DB initialisation was successfull.`,
        };
        log.info(message.message);
        return message;
      }
    } catch {
      (err: Error) => {
        const message = {
          round: messageInput,
          error: `Error in ${messageInput} DB initialisation ` + err,
        };
        log.error(message.error);
        return message;
      };
    }
  }

  async initDbSetup() {
    if (this.accessToken == "") {
      await this.getAccessTokenForBattleNet();
    }
    const result: { message: string }[] = [];
    for (let i: number = 0; i < this.metadataInfoAndMessages.length; i++) {
      const output = await this.getAndSaveTables(
        this.metadataInfoAndMessages[i].path,
        this.metadataInfoAndMessages[i].messageInput,
        this.metadataInfoAndMessages[i].repository
      );
      result.push(output!);
    }

    return { data: result };
  }

  get token() {
    return this.accessToken;
  }
}
