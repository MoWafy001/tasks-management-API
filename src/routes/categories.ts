import express from "express";
import { setCRUDRoutes } from "../helpers";
import { CategoriesController } from "../controllers/Categories";

const CategoriesRouter = express.Router();
setCRUDRoutes(CategoriesRouter, CategoriesController);
export default CategoriesRouter;
