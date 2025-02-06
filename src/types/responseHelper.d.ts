import type { ResponseHelper } from "efri/core/helpers";

declare module "efri/core/types/plugin" {
  export interface IResponseHelper extends ResponseHelper {
    xml: (data: string, status?: number) => Response;
  }
}
