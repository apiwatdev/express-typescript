import { plainToClass, plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { HttpException } from "../exception";

export const validationMiddleware = (
  type: any,
  skipMissingProperties = false
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    validate(plainToInstance(type, req.body), { skipMissingProperties }).then(
      (validationErrors: ValidationError[]) => {
        const errors: string[] = [];
        if (validationErrors.length > 0) {
          for (const errorItem of validationErrors) {
            const constraints = errorItem.constraints;
            if (constraints) {
              const texts = Object.values(constraints).concat();
              errors.push(...texts);
            }
          }
          next(new HttpException(400, "Bad Request", errors));
        } else {
          req.body = plainToInstance(type, req.body);
          next();
        }
      }
    );
  };
};
