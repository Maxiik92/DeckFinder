import express from "express";
import "reflect-metadata";
import { authRouter, userRouter } from "./route/user-route";

const app = express();

app.use(express.json());
app.use(authRouter);
app.use(userRouter);

export default app;
