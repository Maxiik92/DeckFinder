import { Router, Response, Request } from "express";
import log from "../logger/index";
import { UserService } from "../service/user/user-service";
import { UserEntity } from "../database";
import { inputValidation } from "../service/validation/input-validation";
import { idSchema, passwordSchema } from "../service";

export class UserController {
  private readonly _router: Router = Router();

  constructor(private userService: UserService) {
    //check if username or email is available
    this._router.get(
      "/check/:type/:name",
      async (req: Request, res: Response) => {
        log.info("Check user input endpoint accessed.");
        const userInput: string = req.params.name as string;
        const checkType: string = req.params.type as string;
        res.json(await this.userService.checkUserInput(checkType, userInput));
      }
    );

    this._router.get("/get/:id", async (req: Request, res: Response) => {
      log.info("Get user endpoint accessed.");
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
      res.json(await this.userService.getUserbyId(id));
    });

    this._router.patch("/update/:id", async (req: Request, res: Response) => {
      log.info("Update user endpoint accessed.");
      const user = req.body as UserEntity;
      const validation = inputValidation(idSchema, req.params.id);

      if (!validation) {
        return {
          status: 400,
          message: "User ID have to be number.",
          data: [],
        };
      }

      const userId: number = parseInt(req.params.id);
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
        const passwordCheck = await this.userService.checkPassword(
          req.body.oldPassword,
          id
        );
        //if oldPassword is not valid cannot change to new
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
        //new password must be valid
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

    this._router.delete("/delete/:id", async (req: Request, res: Response) => {
      log.info("Delete user endpoint accessed.");
      const validation = await inputValidation(idSchema, req.params.id);

      if (!validation) {
        res.json({
          status: 400,
          message: "User ID have to be number.",
          data: [],
        });
        return;
      }
      const id = parseInt(req.params.id);
      const passwordCheck = await this.userService.checkPassword(
        req.body.password,
        id
      );
      //if password is not valid cannot proceed
      if (!passwordCheck) {
        res.json({
          status: 400,
          message: "Invalid Password.",
          data: [],
        });
        return;
      }
      res.json(await this.userService.deleteUser(id));
      return;
    });
  }

  get router(): Router {
    return this._router;
  }
}
