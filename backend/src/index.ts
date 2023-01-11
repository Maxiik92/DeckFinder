import app from "./app";
import config from "../config/config";
import log from "./logger/index";

const PORT = config.port || 8081;
const HOST = config.host;

app.listen(PORT, () => {
  log.info(`Server is listening at http://${HOST}:${PORT}`);
});
