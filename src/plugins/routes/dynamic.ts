import { UserController } from "../../controllers/UserController";
import { PluginLoader } from "efri/core/plugins/PluginLoader";

export default PluginLoader.registerPlugin({
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
  ] as const,
});
