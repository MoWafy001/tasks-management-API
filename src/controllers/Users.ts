import { Request, Response } from "express";

export const UsersController = {
  create: function (req: Request, res: Response): void {
    res.send("create user");
  },

  getLoggedInUser: function (req: Request, res: Response): void {
    res.send("get logged in user");
  },
};
