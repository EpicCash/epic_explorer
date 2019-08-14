import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions/index';
import { Global } from "../global";

export function validationMiddleware<T>(
  type: any,
  skipMissingProperties = false,
): express.RequestHandler {
  return (request: Request, response: Response, next: NextFunction) => {
    Global.network = request.headers.network;
    validate(
      plainToClass(type, {
        ...request.body,
        ...request.query,
        ...request.params,
      }),
      {
        skipMissingProperties,
      },
    ).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors.map((error: ValidationError) =>
          Object.values(error.constraints),
        );
        next(new HttpException(400, message));
      } else {
        next();
      }
    });
  };
}
