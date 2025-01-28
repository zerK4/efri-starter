import db from "./database";

export default {
  default: db?.DATABASE,
  connections: {
    mysql: {
      driver: "mysql",
      host: db?.DB_HOST,
      port: db?.DB_PORT,
      database: db?.DB_DATABASE,
      username: db?.DB_USERNAME,
      password: db?.DB_PASSWORD,
    },
    postgresql: {
      driver: "postgresql",
      host: db?.DB_HOST,
      port: db?.DB_PORT,
      database: db?.DB_DATABASE,
      username: db?.DB_USERNAME,
      password: db?.DB_PASSWORD,
    },
    sqlite: {
      driver: "sqlite",
      database: "database.sqlite",
      filename: "./src/database/database.sqlite",
    },
  },
};
