import { Router } from "express";
import { CardService } from "../service/card/card-service";

export class CardController {
  private readonly _router: Router = Router();

  constructor(private cardService: CardService) {}

  get router() {
    return this._router;
  }
}
