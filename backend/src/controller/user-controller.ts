import { Router, Response, Request } from "express";
import log from "../logger/index";
import { UserService } from "../service/user/user-service";
import { UserEntity } from "../database";
import { inputValidation } from "../service/validation/input-validation";
import { idSchema, passwordSchema } from "../service";

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
        return;
      }
      return {
        status: 400,
        message: "User ID have to be number.",
        data: [],
      };
    });

    this._router.patch("/update/:id", async (req: Request, res: Response) => {
      log.info("Update user endpoint accessed.");
      const user = req.body as UserEntity;
      const userId: number = parseInt(req.params.id);
      const validation = inputValidation(idSchema, userId);
      if (!validation) {
        return {
          status: 400,
          message: "User ID have to be number.",
          data: [],
        };
      }
      const checkedUser = await this.userService.checkUser(req.body.name);
      if (checkedUser.status == 400) {
        res.json(checkedUser);
        return;
      }
      res.json(await this.userService.updateUser(user, userId));
    });

    this._router.patch(
      "/update/:id/password",
      async (req: Request, res: Response) => {
        log.info("Update user password endpoint accessed.");
        const userId = req.params.id;
        const validation = await inputValidation(idSchema, userId);
        if (!validation) {
          res.json({
            status: 400,
            message: "User ID have to be number.",
            data: [],
          });
          return;
        }
        const id = parseInt(userId);
        const passwordCheck = await this.checkPassword(
          req.body.oldPassword,
          id
        );
        if (!passwordCheck) {
          res.json({
            status: 400,
            message: "Invalid Password.",
            data: [],
          });
          return;
        }
        const newPassword = req.body.newPassword as string;
        const newPasswordValidation = inputValidation(
          passwordSchema,
          newPassword
        );
        if (!newPasswordValidation) {
          res.json({
            status: 400,
            message: "New Password is not Valid",
            data: [],
          });
          return;
        }
        res.json(await this.userService.updateUserPassword(newPassword, id));
        return;
      }
    );
  }

  async checkPassword(password: string, id: number) {
    return await this.userService.checkPassword(password, id);
  }

  get router(): Router {
    return this._router;
  }
}
