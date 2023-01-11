import config from "../../config/config";
import log from "../logger/index";
import { DataSource } from "typeorm";
import { UserEntity } from "./entity/user";

export const appDataSource = new DataSource({
  type: "mysql",
  host: config.database.host,
  port: parseInt(config.database.port!),
  username: config.database.user,
  password: config.database.password,
  database: config.database.database,
  entities: [UserEntity],
  logging: false,
  synchronize: true,
});

appDataSource
  .initialize()
  .then(() => {
    log.info("Data source has been initialized/");
  })
  .catch((error) => {
    log.error("Error during Data source initialization:" + error);
  });
