import { Request, Response } from "express";
import ICRUDController from "./interfaces/crud.controller";

export const TasksController: ICRUDController = {
  create: function (req: Request, res: Response): void {
    res.send("create task");
  },

  getAll: function (req: Request, res: Response): void {
    res.send("get all tasks");
  },

  getOne: function (req: Request, res: Response): void {
    res.send("get one task");
  },

  update: function (req: Request, res: Response): void {
    res.send("update task");
  },

  delete: function (req: Request, res: Response): void {
    res.send("delete task");
  },
};
