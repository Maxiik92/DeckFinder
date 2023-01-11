import { config } from "dotenv";
import { join } from "path";

const envPath = join(__dirname, "../.env");

config({ path: envPath });

export default {
  port: process.env.SERVER_PORT,
  host: process.env.SERVER_HOST,
};
