import { Router, Response, Request } from "express";
import log from "../logger/index";
import { UserService } from "../service/user/user-service";
import { UserEntity } from "../database";

export class UserController {
  private readonly _router: Router = Router();

  constructor(private userService: UserService) {
    this._router.get("/check", async (req: Request, res: Response) => {
      log.info("Check user endpoint accessed.");
      const userName: string = req.body.name as string;
      res.json(await this.userService.checkUser(userName));
    });

    this._router.get("/get/:id", async (req: Request, res: Response) => {
      log.info("Get user endpoint accessed.");
      const userId: number = parseInt(req.params.id);
      if (!isNaN(userId)) {
        res.json(await this.userService.getUser(userId));
      }
    });
  }

  get router(): Router {
    return this._router;
  }
}
