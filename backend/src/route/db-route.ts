import { Router } from "express";
import { DatabaseController } from "../controller/database-controller";
import { DatabaseService } from "../service/database/database-service";
import { CardRepository } from "../repository/card-repository";
import { ClassRepository } from "../repository/class-repository";
import { SetRepository } from "../repository/set-repository";
import { CardTypeRepository } from "../repository/card-type-repository";
import { RarityRepository } from "../repository/rarity-repository";
import { KeywordRepository } from "../repository/keyword-repository";

const databaseRouter = Router();
const cardRepository = new CardRepository();
const classRepository = new ClassRepository();
const setRepository = new SetRepository();
const cardTypeRepository = new CardTypeRepository();
const rarityRepository = new RarityRepository();
const keywordRepository = new KeywordRepository();
const databaseService = new DatabaseService(
  cardRepository,
  classRepository,
  setRepository,
  cardTypeRepository,
  rarityRepository,
  keywordRepository
);
const databaseController = new DatabaseController(databaseService);

databaseRouter.use("/db", databaseController.router);

export { databaseRouter };
