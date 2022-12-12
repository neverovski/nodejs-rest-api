/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { RequestHandler } from 'express';
import pino from 'pino-http';

import { AppConfig } from '@config';
import { MiddlewareCore } from '@core';
import { Logger } from '@libs';
import { ENV_DEVELOPMENT, IpUtil, LogLevel, LoggerType } from '@utils';

class LoggerMiddleware extends MiddlewareCore {
  handler(): RequestHandler {
    return pino({
      // Define a custom success message
      customSuccessMessage: (req, res) => {
        if (res?.statusCode === 404) {
          return 'Resource not found';
        }

        return `${req?.method} completed`;
      },

      // Define a custom receive message
      customReceivedMessage: (req) => {
        return `Request received: ${req?.method}`;
      },

      // Define a custom error message
      customErrorMessage: (_req, res) => {
        return `Request errored with status code: ${res.statusCode}`;
      },

      // Define a custom logger level
      customLogLevel: (_req, res, err) => {
        if (res?.statusCode >= 400 && res?.statusCode < 500) {
          return LogLevel.WARN;
        } else if (res?.statusCode >= 500 || err) {
          return LogLevel.ERROR;
        }

        return LogLevel.INFO;
      },
      serializers: {
        req: (req) => ({
          id: req.id,
          method: req.method,
          url: req.url,
          query: req.query,
          params: req.params,
          userAgent: req.headers['user-agent'] || '',
          ip: IpUtil.getIp(req),
          ...(AppConfig.env === ENV_DEVELOPMENT && {
            headers: req?.headers || null,
            body: req?.raw?.body || null,
          }),
        }),
        res: (res) => ({
          statusCode: res?.statusCode || null,
          ...(AppConfig.env === ENV_DEVELOPMENT && {
            headers: res?.headers || null,
          }),
        }),
      },
      customProps: () => ({ type: LoggerType.HTTP }),
      logger: Logger.pino,
    });
  }
}

export default new LoggerMiddleware();
