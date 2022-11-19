import { NextFunction, Request, RequestHandler, Response } from 'express';

import { MiddlewareCore } from '@core';
import { IpUtil, UserAgentUtil } from '@utils';

class UserAgentMiddleware extends MiddlewareCore {
  handler(): RequestHandler {
    return (req: Request, _res: Response, next: NextFunction) => {
      const userAgent = req.headers['user-agent'] || '';

      req.userAgent = Object.freeze({
        ip: IpUtil.getIp(req),
        userAgent,
        os: UserAgentUtil.getOS(userAgent),
        browser: UserAgentUtil.getBrowser(userAgent),
      });

      next();
    };
  }
}

export default new UserAgentMiddleware();
