import type { RoutePlugin } from "efri/core/types/routes";
import { UserController } from "../../controllers/UserController";

const dynamicRoutesPlugin: RoutePlugin = {
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
