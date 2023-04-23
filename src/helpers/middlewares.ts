import { Express } from "express";
import { Middleware } from "../middlewares/config";
import { IRouteSpecificMiddleware } from "../middlewares/interfaces/RouteSpecificMid.interface";

// applys a middleware to the app
export const applyMiddleWare = (app: Express, middleware: Middleware) => {
  if ("middleware" in middleware) {
    applyRouteSpecificMiddlewareToApp(
      middleware.middleware,
      middleware.applyTo,
      middleware.exclude,
      app
    );
  } else {
    app.use(middleware);
  }
};

// applys a route specific middleware to the app
const applyRouteSpecificMiddlewareToApp = (
  middlewareFunction: IRouteSpecificMiddleware["middleware"],
  pathsToApplyTo: string[] = [],
  pathsToExclude: string[] = [],
  app: Express
) => {
  const regexPathsToApplyTo =
    pathsToApplyTo.length === 0
      ? [/^.*$/]
      : pathsToApplyTo.map((path) => new RegExp(path));

  const regexPathsToExclude =
    pathsToExclude.length === 0
      ? []
      : pathsToExclude.map((path) => new RegExp(path));

  app.use((req, res, next) => {
    const shouldApplyMiddleware =
      regexPathsToApplyTo.some((regexPath) => regexPath.test(req.path)) &&
      !regexPathsToExclude.some((regexPath) => regexPath.test(req.path));

    if (shouldApplyMiddleware) {
      middlewareFunction(req, res, next);
    } else {
      next();
    }
  });
};
