import type { IPlugin } from "efri/core/types/plugin";
import { UserController } from "../../controllers/UserController";

const dynamicRoutesPlugin: IPlugin = {
  name: "dynamic-routes",
  type: "route-plugin",
  routes: [
    {
      handler: [UserController, "index"],
      method: "GET",
      path: "/dynamic/route",
      middleware: [],
      file: "./src/plugins/dynamic.ts",
    },
  ],
};

export default dynamicRoutesPlugin;
