import { ErrorRequestHandler, RequestHandler } from 'express';

export default abstract class MiddlewareCore {
  abstract handler(data?: any): RequestHandler | ErrorRequestHandler;
}
