import { logger } from "efri/core/logger/CoreLogger";
import { BaseMiddleware, middlewareStack } from "efri/core/middlewares";

export default middlewareStack.register("logger", {
  async handle(req: Request, next: () => Promise<Response>): Promise<Response> {
    const start = Date.now();

    // logger.info(
    //   `[${new Date().toISOString()}] ${req.method} ${new URL(req.url).pathname}`
    // );

    console.log(
      `[${new Date().toISOString()}] ${req.method} ${new URL(req.url).pathname}`
    );

    const response = await next();

    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] Completed ${
        response.status
      } (${duration}ms)`
    );

    return response;
  },
});
