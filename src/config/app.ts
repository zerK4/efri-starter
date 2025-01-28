import { ConfigLoader } from "efri/core/config";
import { z } from "zod";

export default ConfigLoader.validateAppEnv(
  z.object({
    env: z
      .enum(["local", "development", "production", "testing"])
      .default("local"),
    name: z.string().default("starta"),
    port: z
      .string()
      .regex(/^\d+$/, "APP_PORT must be a valid number")
      .transform((val) => parseInt(val, 10))
      .catch(() => 3000) // Fallback if parsing fails
      .default("3000"),
  })
);
