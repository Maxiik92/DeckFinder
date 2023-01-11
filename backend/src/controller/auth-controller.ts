import { UserEntity } from "../database";
import log from "../logger";
import { Router, Request, Response } from "express";
import { UserService } from "../service/user/user-service";

export class AuthController {
  private readonly _router: Router = Router();

  constructor(private userService: UserService) {
    this._router.post("/create", async (req: Request, res: Response) => {
      log.info("Create user endpoint accessed.");
      const user: UserEntity = req.body as UserEntity;
      res.json(await this.userService.createUser(user));
    });
  }

  get router(): Router {
    return this._router;
  }
}
