import { config } from "efri/core/config";

export default config.defineConfig("rateLimiter", {
  windowSizeInSeconds: 60,
  maxRequests: 100,
});
