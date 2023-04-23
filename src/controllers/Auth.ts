import { Request, Response } from "express";

export const AuthController = {
  login: (req: Request, res: Response) => {
    res.send("login");
  },
};
