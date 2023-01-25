import { UserEntity } from "../database";
import log from "../logger";
import { Router, Request, Response } from "express";
import { UserService } from "../service/user/user-service";
import { Login } from "../interfaces/login";
import bcrypt from "bcrypt";

export class AuthController {
  private readonly _router: Router = Router();

  constructor(private userService: UserService) {
    this._router.post("/create", async (req: Request, res: Response) => {
      log.info("Create user endpoint accessed.");
      const user: UserEntity = req.body as UserEntity;
      const checkedUser = await this.userService.checkUser(user);
      console.log(checkedUser);
      if (checkedUser.status == 400) {
        res.json(checkedUser);
        return;
      }
      res.json(await this.userService.createUser(user));
    });

    this._router.post("/login", async (req: Request, res: Response) => {
      log.info("Login user endpoint accessed.");
      const login: Login = req.body;
      res.json(await this.userService.login(login));
    });
  }

  get router(): Router {
    return this._router;
  }

  async passwordCheck(req: Request, res: Response, foundUser: UserEntity) {
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      foundUser.password!
    );

    if (!isPasswordValid) {
      res.json({ status: 400, message: "Password is not valid.", data: {} });
    }
    console.log("valid Pass");
  }
}
