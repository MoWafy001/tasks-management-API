import { NextFunction, Request, Response } from "express";
import ICRUDController from "./interfaces/crud.controller";

export const CategoriesController: ICRUDController = {
  create: function (req: Request, res: Response, next: NextFunction): void {
    res.send("create category");
  },

  getAll: function (req: Request, res: Response): void {
    res.send("get all categories");
  },

  getOne: function (req: Request, res: Response): void {
    res.send("get one category");
  },

  update: function (req: Request, res: Response): void {
    res.send("update category");
  },

  delete: function (req: Request, res: Response): void {
    res.send("delete category");
  },
};
