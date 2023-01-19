import express from "express";
import "reflect-metadata";
import cors from "cors";
import { authRouter, userRouter } from "./route/user-route";

const app = express();
const allowedDomains = ["http://localhost:4200", "http://localhost:8080"];

app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      // bypass the requests with no origin (like curl requests, mobile apps, etc )
      if (!origin) return callback(null, true);
      if (allowedDomains.indexOf(origin) === -1) {
        const msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);
app.use(authRouter);
app.use(userRouter);

export default app;
