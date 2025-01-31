declare module "efri/core/types/plugin" {
  export interface IPlugin extends ICorePlugin {
    type: "response-helper" | "route-plugin" | "middleware-plugin";
    name: string;
    init?(helper: ResponseHelper): void;
    routes?: RouteInfo[];
    methods?: {};
  }
}
