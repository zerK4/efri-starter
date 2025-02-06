import { config } from "efri/core/config";
import { z } from "zod";

// TODO: to be fixed. Useless for now

export default config.defineConfig(
  "logger",
  z.object({
    type: z
      .array(z.enum(["console", "file", "json"]))
      .default(["file", "console", "json"]),
    level: z.enum(["debug", "info", "warn", "error"]).default("info"),
    prettyPrint: z.boolean().default(true),
    filePath: z.string().default("./logs/app.log"),
  })
);
