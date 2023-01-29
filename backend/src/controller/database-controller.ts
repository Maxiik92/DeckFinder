import { Router, Request, Response } from "express";
import { DatabaseService } from "../service/database/database-service";
import log from "../logger";
//this controller is for test purposes only...everything that is done beyond this point will be automated
export class DatabaseController {
  private readonly _router: Router = Router();

  constructor(private dbService: DatabaseService) {
    this._router.post("/initSetup", async (req: Request, res: Response) => {
      log.info("InitSetup endpoint accessed.");
      res.json(await this.dbService.initDbSetup());
    });
  }

  get router() {
    return this._router;
  }
}
