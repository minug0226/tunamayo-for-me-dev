import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

export const DB = new DataSource({
  type: "mysql",
  host: process.env.RDS_HOST,
  port: 3306,
  username: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DATABASE,
  synchronize: false,
  logging: true,
  entities: [__dirname + "/entity/**/*.ts"],
  migrations: [],
});
