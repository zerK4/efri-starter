import { z } from "zod";
import { config } from "efri/core/config/config/CoreConfig";
import type { DatabaseConfig } from "efri/core/types";

export const databaseSchema = z
  .object({
    DATABASE: z
      .enum(["mysql", "sqlite", "turso", "postgresql"])
      .default("sqlite"),
    DB_HOST: z.string().optional(),
    DB_PORT: z
      .string()
      .regex(/^\d+$/, "DB_PORT must be a valid number")
      .transform((val) => parseInt(val, 10))
      .optional(),
    DB_USERNAME: z.string().optional(),
    DB_PASSWORD: z.string().optional(),
    DB_DATABASE: z.string().default("database"),
  })
  .refine(
    (data) => {
      if (data.DATABASE !== "sqlite") {
        return (
          !!data.DB_HOST &&
          !!data.DB_PORT &&
          !!data.DB_USERNAME &&
          !!data.DB_PASSWORD
        );
      }
      return true;
    },
    {
      message:
        "DB_HOST, DB_PORT, DB_USERNAME, and DB_PASSWORD are required when DATABASE is not 'sqlite'.",
      path: ["DATABASE"],
    }
  );

export const db = config.validateSchema(databaseSchema);

export default config.defineConfig("database", databaseSchema);
