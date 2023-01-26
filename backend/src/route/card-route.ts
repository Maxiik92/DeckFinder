import { Router } from "express";
import { CardController } from "../controller/card-controller";
import { CardService } from "../service/card/card-service";
import { CardRepository } from "../repository/card-repository";

const cardRouter = Router();
const cardRepository = new CardRepository();
const cardService = new CardService(cardRepository);
const cardController = new CardController(cardService);

cardRouter.use("/card", cardController.router);

export { cardRouter };
