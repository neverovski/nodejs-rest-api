import type {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction,
  RequestHandler,
} from 'express';
import { inject as Inject, singleton as Singleton } from 'tsyringe';

import { ConfigKey } from '@common/enums';
import { IAppConfig } from '@config';
import { MiddlewareCore } from '@core';

@Singleton()
export class InitMiddleware extends MiddlewareCore {
  constructor(@Inject(ConfigKey.APP) private readonly appConfig: IAppConfig) {
    super();
  }

  handler(): RequestHandler {
    return (_req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
      res.header('X-Server', this.appConfig.name);

      next();
    };
  }
}
