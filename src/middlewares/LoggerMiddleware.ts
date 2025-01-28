import { logger } from "efri/core/logger";
import type { MiddlewareHandler } from "efri/core/types/middleware";

export class LoggerMiddleware implements MiddlewareHandler {
  async handle(req: Request, next: () => Promise<Response>): Promise<Response> {
    const start = Date.now();

    logger.info(
      `[${new Date().toISOString()}] ${req.method} ${new URL(req.url).pathname}`
    );

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
  }
}
