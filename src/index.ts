import config from "./config";
import express from "express";
import AppDataSource from "./db/data-source";
import mainRouter from "./routes";
import { applyErrorHandling } from "./middlewares/error-handling";
import { applyGlobalMiddlewares } from "./middlewares/global";

const main = async () => {
  // Initialize database
  console.log("Initializing database...");
  await AppDataSource.initialize().catch((err) => {
    console.error("Failed to initialize database");
    console.error(err);
    process.exit(1);
  });
  console.log("Database initialized");

  // Initialize express app
  const app = express();
  applyGlobalMiddlewares(app); // before
  app.use("/", mainRouter);
  applyErrorHandling(app); // after

  // Start server
  app.listen(config.port, () => {
    console.log(`Server is listening on port ${config.port}`);
  });
};

main().catch((err) => console.error);
