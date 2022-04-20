/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { RequestHandler } from 'express';
import pino from 'express-pino-logger';

import { MiddlewareCore } from '@core';
import { Logger } from '@lib';
import { LoggerType } from '@utils';
import { IPHelper } from '@utils/helpers';

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
          ip: IPHelper.getIP(req),
          userAgent: req.headers['user-agent'] || '',
        }),
      },
      reqCustomProps: () => ({ type: LoggerType.HTTP }),
      logger: Logger.pino,
    });
  }
}

export default new LoggerMiddleware();
