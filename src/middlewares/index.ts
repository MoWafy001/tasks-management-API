import { Express } from "express";
import { globalMiddlewaresPost, globalMiddlewaresPre } from "./config";
import { applyMiddleWare } from "../helpers/middlewares";

// applys middlewares before the main router
export const applyMiddlewaresPre = (app: Express) => {
  globalMiddlewaresPre.forEach((middleware) =>
    applyMiddleWare(app, middleware)
  );
};

// applys middlewares after the main router
export const applyMiddlewaresPost = (app: Express) => {
  globalMiddlewaresPost.forEach((middleware) =>
    applyMiddleWare(app, middleware)
  );
};
