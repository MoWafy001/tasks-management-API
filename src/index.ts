import config from "./config/config";
import express from "express";
import { AppDataSource } from "./db/data-source";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const main = async () => {
  // Initialize database
  console.log("Initializing database...");
  await AppDataSource.initialize();
  console.log("Database initialized");

  // Start server
  app.listen(config.port, () => {
    console.log(`Server is listening on port ${config.port}`);
  });
};

main().catch((err) => console.error);
