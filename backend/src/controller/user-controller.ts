import { Router, Response, Request } from "express";
import log from "../logger/index";
import { UserService } from "../service/user/user-service";

export class UserController {
  private readonly _router: Router = Router();

  constructor(private userService: UserService) {}

  get router(): Router {
    return this._router;
  }
}
