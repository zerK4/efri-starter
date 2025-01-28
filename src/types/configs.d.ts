interface ILogging {
  level: string;
  prettyPrint: boolean;
  filePath: string;
}

declare module "./config-loader" {
  interface ConfigRegistry {
    logger: ILogging;
  }
}
