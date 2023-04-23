import express from "express";
import { setCRUDRoutes } from "../helpers";
import { CategoriesController } from "../controllers/Categories";
import { authMiddleware } from "../middlewares/specific";

const categoriesRouter = express.Router();
categoriesRouter.use(authMiddleware);
setCRUDRoutes(categoriesRouter, CategoriesController);
export default categoriesRouter;
