import { ErrorRequestHandler, RequestHandler } from 'express';

export interface IMiddleware {
  handler(data?: any): RequestHandler | ErrorRequestHandler;
}
