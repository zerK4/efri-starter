import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { LoggerMiddleware } from "../middlewares/LoggerMiddleware";

export default {
  "auth": new AuthMiddleware(),
  "logger": new LoggerMiddleware(),
};
