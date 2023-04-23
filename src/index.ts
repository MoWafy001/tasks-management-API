import config from "./config";
import express from "express";
import AppDataSource from "./db/data-source";
import mainRouter from "./routes";

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
  app.use("/", mainRouter);

  // Start server
  app.listen(config.port, () => {
    console.log(`Server is listening on port ${config.port}`);
  });
};

main().catch((err) => console.error);
