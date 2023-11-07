import type { NextFunction, Request, RequestHandler, Response } from 'express';

import { IpUtil, UrlUtil, UserAgetUtil } from '@common/utils';
import { MiddlewareCore } from '@core';

class UserSessionMiddleware extends MiddlewareCore {
  handler(): RequestHandler {
    return (req: Request, _res: Response, next: NextFunction) => {
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

export default new UserSessionMiddleware();
