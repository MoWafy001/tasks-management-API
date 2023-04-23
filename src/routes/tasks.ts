import express from "express";
import { setCRUDRoutes } from "../helpers";
import { TasksController } from "../controllers/Tasks";

const TasksRouter = express.Router();
setCRUDRoutes(TasksRouter, TasksController);
export default TasksRouter;
