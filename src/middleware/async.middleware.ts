import type {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction,
} from 'express';
import { singleton as Singleton } from 'tsyringe';

import { MiddlewareCore } from '@core';

@Singleton()
export class AsyncMiddleware extends MiddlewareCore {
  handler() {
    const fn = (
      req: ExpressRequest,
      res: ExpressResponse,
      next: NextFunction,
    ) => Promise.resolve(fn(req, res, next)).catch(next);

    return fn;
  }
}
