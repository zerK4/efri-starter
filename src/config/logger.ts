import { config } from "efri/core/config";

export default config.defineConfig("logger", {
  type: ["file", "console"], // Available ["json"],
  level: "info",
  prettyPrint: true,
  filePath: "./logs/app.log",
});
