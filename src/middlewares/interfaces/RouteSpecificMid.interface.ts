import { NextFunction, Request, Response } from "express";

export interface IRouteSpecificMiddleware {
  middleware: (req: Request, res: Response, next: NextFunction) => void;
  applyTo?: string[];
  exclude?: string[];
}
