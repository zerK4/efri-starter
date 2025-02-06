import type { LoggerConfig, LogLevel } from "efri/core/types";
import type { IPlugin } from "efri/core/types/plugin";

export default {
  name: "TestOne",
  type: "logger",
  methods: {
    log: (
      level: LogLevel,
      message: any,
      context: any,
      config: LoggerConfig
    ): void => {
      // Do your thing..
    },
  },
} satisfies IPlugin;