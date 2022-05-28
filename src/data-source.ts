import { DataSource } from "typeorm";

require("dotenv").config();

export const AppDataSource = new DataSource({
  type: "postgres",

  url: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,

  synchronize: false,
  logging: true,
  entities:
    process.env.NODE_ENV === "production"
      ? ["src/entities/*.ts"]
      : ["src/entities/*.ts"],
  migrations:
    process.env.NODE_ENV === "production"
      ? ["src/migrations/*.ts"]
      : ["src/migrations/*.ts"],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source Initialized");
  })
  .catch((err) => {
    console.error("Error during data source Initialization", err);
  });
