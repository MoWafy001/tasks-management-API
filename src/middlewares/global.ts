import { NextFunction, Request, Response } from "express";

// This middleware is used to log the request method and path
export const LoggingMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`${req.method} ${req.path}`);
  next();
};

// This middleware is used to format the response body
export const responseFormatterMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const originalSend = res.send;

  res.send = function (body) {
    try {
      // Parse the body into an object
      body = JSON.parse(body);
    } catch (error) {}

    // Create the response body
    const responseBody = JSON.stringify({ data: body });

    // Set the response header
    res.header("Content-Type", "application/json");

    // Return the original send function with the formatted body
    return originalSend.call(this, responseBody);
  };

  next();
};
