import express from "express";
import { setCRUDRoutes } from "../helpers";
import { TasksController } from "../controllers/Tasks";
import { authMiddleware } from "../middlewares/specific";

const tasksRouter = express.Router();
tasksRouter.use(authMiddleware);
setCRUDRoutes(tasksRouter, TasksController);
export default tasksRouter;
