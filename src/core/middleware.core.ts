import { ErrorRequestHandler, RequestHandler } from 'express';

export abstract class MiddlewareCore {
  abstract handler(data?: any): RequestHandler | ErrorRequestHandler;
}
