import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exception";

export interface IResponseError {
  status: number;
  message: string;
  errors?: string[];
}
export const errorMiddleware = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {

  const status = error?.status || 500;
  const message = error?.message || 'Internal Server Error';
  const errors = error?.errors;
  const responseError: IResponseError = {
    status,
    message,
    errors,
  };

  !errors ? delete responseError.errors : null;

  return response.status(status).send(responseError);
};
