import type { Request, RequestHandler } from 'express';
import pino from 'pino-http';

import { ENV_DEVELOPMENT } from '@common/constants';
import { LogLevel, LoggerType } from '@common/enums';
import { AppConfig } from '@config';
import { MiddlewareCore } from '@core';
import { Logger } from '@providers/logger';

class LoggerMiddleware extends MiddlewareCore {
  handler(): RequestHandler {
    return pino({
      // Define a custom success message
      customSuccessMessage: (req, res) => {
        if (res?.statusCode === 404) {
          return 'Resource not found';
        }

        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        return `${req?.method} completed`;
      },

      // Define a custom receive message
      customReceivedMessage: (req) => {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
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
        req: (req: Request) => {
          return {
            id: req.id,
            method: req.method,
            url: req.url,
            query: req.query,
            params: req.params,
            session: req?.userSession,
            ...(AppConfig.env === ENV_DEVELOPMENT && {
              headers: req?.headers || null,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
              body: req?.raw?.body || null,
            }),
          };
        },
        res: (res) => ({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          statusCode: res?.statusCode || null,
          ...(AppConfig.env === ENV_DEVELOPMENT && {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            headers: res?.headers || null,
          }),
        }),
      },
      customProps: () => ({ type: LoggerType.HTTP }),
      logger: Logger.logger,
    });
  }
}

export default new LoggerMiddleware();
