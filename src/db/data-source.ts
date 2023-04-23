import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Category } from "./entity/Category";
import { Task } from "./entity/Task";
import config from "../config/config";

export const AppDataSource = new DataSource({
  ...config.db,
  type: "mysql",
  synchronize: true,
  logging: false,
  entities: [User, Category, Task]
});
