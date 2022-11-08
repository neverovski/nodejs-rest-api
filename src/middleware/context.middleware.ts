import { NextFunction, Request, RequestHandler, Response } from 'express';

import { MiddlewareCore } from '@core';
import { IpUtil, UserAgentUtil } from '@utils';

class ContextMiddleware extends MiddlewareCore {
  handler(): RequestHandler {
    return (req: Request, _res: Response, next: NextFunction) => {
      const userAgent = req.headers['user-agent'] || '';

      req.ctx = Object.freeze({
        ...req.ctx,
        ip: IpUtil.getIP(req),
        userAgent,
        os: UserAgentUtil.getOS(userAgent),
        browser: UserAgentUtil.getBrowser(userAgent),
      });

      next();
    };
  }
}

export default new ContextMiddleware();
