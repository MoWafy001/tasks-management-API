import express from "express";
import { setCRUDRoutes } from "../helpers";
import { CategoriesController } from "../controllers/Categories";

const categoriesRouter = express.Router();
setCRUDRoutes(categoriesRouter, CategoriesController);
export default categoriesRouter;
