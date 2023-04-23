import { NextFunction, Request, Response } from "express";
import http from "http";

export class HttpError extends Error {
  status: number;
  constructor(status: number, message?: string) {
    super(message || http.STATUS_CODES[status] || "Error");
    this.status = status;
  }
}

export const handle404 = (req: Request, res: Response, next: NextFunction) => {
  const err = new HttpError(404, "Not Found");
  next(err);
};

export const handleErrors = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || "Internal Server Error",
  });
};