import express from "express";
import { AuthController } from "../controllers/Auth";
import TasksRouter from "./tasks";
import CategoriesRouter from "./categories";
import { UsersController } from "../controllers/Users";

const mainRouter = express.Router();
mainRouter.post("/register", UsersController.create);
mainRouter.get("/me", UsersController.getLoggedInUser);
mainRouter.post("/login", AuthController.login);
mainRouter.use("/tasks", TasksRouter);
mainRouter.use("/categories", CategoriesRouter);
export default mainRouter;
