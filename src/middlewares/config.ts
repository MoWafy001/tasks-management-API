import { NextFunction, Request, Response } from "express";
import { handle404, handleErrors } from "./error-handling";
import { LoggingMiddleware, responseFormatterMiddleware } from "./global";
import { IRouteSpecificMiddleware } from "./interfaces/RouteSpecificMid.interface";
import { authMiddleware } from "./specific";

export type Middleware =
  | IRouteSpecificMiddleware
  | ((req: Request, res: Response, next: NextFunction) => any)
  | ((err: any, req: Request, res: Response, next: NextFunction) => any);

// to run middlewares before the main router
export const globalMiddlewaresPre: Middleware[] = [
  LoggingMiddleware,
  responseFormatterMiddleware,
  {
    middleware: authMiddleware,
    exclude: ["/register", "/login"],
  },
];

// to run middlewares after the main router
export const globalMiddlewaresPost: Middleware[] = [handle404, handleErrors];
