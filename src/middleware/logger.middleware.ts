/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { RequestHandler } from 'express';
import pino from 'express-pino-logger';

import { MiddlewareCore } from '@core';
import { Logger } from '@lib';
import { LoggerType } from '@utils';

class LoggerMiddleware extends MiddlewareCore {
  handler(): RequestHandler {
    return pino({
      customSuccessMessage: () => 'Request HTTP',
      serializers: {
        req: (req) => ({
          id: req.id,
          method: req.method,
          url: req.url,
          query: req.query,
          params: req.params,
          headers: req.headers,
          proxyAndXForwardedFor: req?.headers['x-forwarded-for'] || '',
          remoteAddress:
            req?.headers['x-real-ip'] || req?.connection?.remoteAddress || '',
          remotePort: req.remotePort,
        }),
      },
      reqCustomProps: () => ({ type: LoggerType.HTTP }),
      logger: Logger.pino,
    });
  }
}

export default new LoggerMiddleware();
