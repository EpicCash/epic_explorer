import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions/index';

export function errorMiddleware(
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const status = error.status || 500;
  const message = error.message || 'Internal Server Error';
  const timestamp = Date.now();
  response.status(status).send({
    status,
    timestamp,
    message,
    error: error.error || {},
  });
}
