import express from "express";
import { setCRUDRoutes } from "../helpers";
import { TasksController } from "../controllers/Tasks";

const tasksRouter = express.Router();
setCRUDRoutes(tasksRouter, TasksController);
export default tasksRouter;
