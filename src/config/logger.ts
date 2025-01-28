import { ConfigLoader } from "efri/core/config";
import { z } from "zod";

// TODO: to be fixed. Useless for now

export default ConfigLoader.validateAppEnv(
  z.object({
    level: z.string().default("info"),
    prettyPrint: z.boolean().default(true),
    filePath: z.string().default("./logs/app.log"),
  })
);
