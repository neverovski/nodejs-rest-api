import type { Request as ExpressRequest, RequestHandler } from 'express';
import pino from 'pino-http';
import { inject as Inject, singleton as Singleton } from 'tsyringe';

import { ENV_PRODUCTION } from '@common/constants';
import { ConfigKey, LogLevel, LoggerCtx } from '@common/enums';
import { IAppConfig } from '@config';
import { MiddlewareCore } from '@core';
import { ILoggerService, LoggerInject } from '@providers/logger';

@Singleton()
export class LoggerMiddleware extends MiddlewareCore {
  constructor(
    @Inject(ConfigKey.APP) private readonly appConfig: IAppConfig,
    @Inject(LoggerInject.SERVICE)
    private readonly loggerService: ILoggerService,
  ) {
    super();
  }

  handler(): RequestHandler {
    return pino({
      customSuccessMessage: () => {
        return LoggerCtx.HTTP;
      },

      customReceivedMessage: () => {
        return LoggerCtx.HTTP;
      },

      customErrorMessage: () => {
        return LoggerCtx.HTTP;
      },

      customLogLevel: (_req, res, err) => {
        if (res?.statusCode >= 400 && res?.statusCode < 500) {
          return LogLevel.WARN;
        } else if (res?.statusCode >= 500 || err) {
          return LogLevel.ERROR;
        }

        return LogLevel.INFO;
      },
      serializers: {
        req: (req: ExpressRequest) => {
          return {
            id: req.id,
            method: req.method,
            url: req.url,
            query: req.query,
            params: req.params,
            userSession: req?.userSession,
            ...(this.appConfig.env !== ENV_PRODUCTION && {
              headers: req?.headers || null,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
              body: req?.raw?.body || null,
            }),
          };
        },
        res: ({ statusCode, headers }: ExpressRequest) => ({
          statusCode: statusCode || null,
          ...(this.appConfig.env !== ENV_PRODUCTION && {
            headers: headers || null,
          }),
        }),
      },
      logger: this.loggerService.pino,
    });
  }
}
