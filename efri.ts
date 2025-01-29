import middlewares from "./src/middlewares";
import { ConfigLoader } from "efri/core/config";
import { CommandLoader } from "efri/core/cli/CommandLoader";
import { middlewareStack } from "efri/core/middlewares/Middleware";
import PluginLoader from "efri/core/plugins/PluginLoader";

export const efri = {
  registerMiddlewares() {
    Object.keys(middlewares).forEach((key) => {
      middlewareStack.register(
        key,
        middlewares[key as keyof typeof middlewares]
      );
    });
  },
  async registerCommands() {
    await CommandLoader.loadCommands();
  },
  async registerConfigs() {
    await ConfigLoader.loadConfigs();
  },
  async init() {
    await this.registerConfigs();
    this.registerMiddlewares();
    await this.registerCommands();
    await PluginLoader.discoverPlugins();
  },
};
