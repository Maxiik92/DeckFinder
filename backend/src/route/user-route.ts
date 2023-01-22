import { Router } from "express";
import { UserRepository } from "../repository/user-repository";
import { UserService } from "../service/user/user-service";
import { AuthController } from "../controller/auth-controller";
import { UserController } from "../controller/user-controller";

const userRouter = Router();
const authRouter = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const authController = new AuthController(userService);
const userController = new UserController(userService);

userRouter.use("/user", userController.router);
authRouter.use("/auth", authController.router);

export { userRouter, authRouter };
