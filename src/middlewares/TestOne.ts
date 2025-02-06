import { middlewareStack } from "efri/core/middlewares";

export default middlewareStack.register("TestOne", {
  async handle(req: Request, next: () => Promise<Response>): Promise<Response> {
    return await next();
  },
});
