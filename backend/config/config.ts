import { config } from "dotenv";
import fs from "fs";
import { join } from "path";
import path from "path";

const envPath = join(__dirname, "../.env");

config({ path: envPath });

export default {
  port: process.env.SERVER_PORT,
  host: process.env.SERVER_HOST,
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
  },
  privateKey: fs.readFileSync(
    path.join(__dirname, "../keys", "rsa.key"),
    "utf8"
  ),
  publicKey: fs.readFileSync(
    path.join(__dirname, "../keys", "rsa.key.pub"),
    "utf8"
  ),
  tokenExpiry: process.env.TOKEN_EXPIRY,
};
