import { NextFunction, Request, Response } from "express";

const LoggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  next();
};

const responseFormatterMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const originalSend = res.send;

  res.send = function (body) {
    try {
      body = JSON.parse(body);
    } catch (error) {}

    const responseBody = JSON.stringify({ data: body });
    res.header("Content-Type", "application/json");
    return originalSend.call(this, responseBody);
  };

  next();
};

export const applyGlobalMiddlewares = (app: any) => {
  app.use(LoggingMiddleware);
  app.use(responseFormatterMiddleware);
};
