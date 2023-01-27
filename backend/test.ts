import { buffer } from "stream/consumers";
import config from "./config/config";

const data = `${config.battleNet.clientId}:${config.battleNet.secret}`;
const encodedData = Buffer.from(data, "utf8").toString("base64");
const btoaData = btoa(data);
console.log(encodedData);
console.log(btoaData);
