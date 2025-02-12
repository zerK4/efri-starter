import { config } from "efri/core/config";
import { z } from "zod";

export default config.defineConfig(
  "app",
  z.object({
    env: z
      .enum(["local", "development", "production", "testing"])
      .default("local"),
    name: z.string().default("efri"),
    port: z
      .string()
      .regex(/^\d+$/, "PORT must be a valid number")
      .transform((val) => parseInt(val, 10)),
  }),
  {
    prefix: "APP",
  }
);
