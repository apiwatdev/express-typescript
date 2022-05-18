import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exception";

export const errorMiddleware = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = error.status;
  const message = error.message;
  console.log(error)
  return response.status(status).send({
    status,
    message,
  });
}


