import type {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction,
  RequestHandler,
} from 'express';
import { singleton as Singleton } from 'tsyringe';

import { IpUtil, UrlUtil, UserAgetUtil } from '@common/utils';
import { MiddlewareCore } from '@core';

@Singleton()
export class UserSessionMiddleware extends MiddlewareCore {
  handler(): RequestHandler {
    return (req: ExpressRequest, _res: ExpressResponse, next: NextFunction) => {
      const userAgent = req.headers?.['user-agent'] || '';

      const ip = IpUtil.getIp(req);
      const os = UserAgetUtil.getOS(userAgent);
      const browser = UserAgetUtil.getBrowser(userAgent);
      const domain = UrlUtil.getDomain(req.headers?.origin);

      req.userSession = { os, ip, browser, domain, userAgent };

      next();
    };
  }
}
