import { config } from "dotenv";
import { join } from "path";

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
  privateKey: process.env.JWT_PRIVATE_KEY,
  publicKey: process.env.JWT_PUBLIC_KEY,
  tokenExpiry: process.env.TOKEN_EXPIRY,
};
