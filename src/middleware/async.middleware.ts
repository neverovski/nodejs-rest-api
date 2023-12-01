import type {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction,
} from 'express';
import { singleton as Singleton } from 'tsyringe';

import { MiddlewareCore } from '@core';

@Singleton()
export class AsyncMiddleware extends MiddlewareCore {
  handler(
    call: (
      req: ExpressRequest,
      res: ExpressResponse,
      next: NextFunction,
    ) => Promise<void>,
  ) {
    return (req: ExpressRequest, res: ExpressResponse, next: NextFunction) =>
      Promise.resolve(call(req, res, next)).catch(next);
  }
}
