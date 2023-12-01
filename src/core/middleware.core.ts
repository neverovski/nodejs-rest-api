import { ErrorRequestHandler, RequestHandler } from 'express';

import { IMiddleware } from '@common/interfaces';

export abstract class MiddlewareCore implements IMiddleware {
  abstract handler(data?: unknown): RequestHandler | ErrorRequestHandler;
}
