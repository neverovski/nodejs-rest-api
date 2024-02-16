import { Level, levels, pino } from 'pino';
import { inject as Inject, singleton as Singleton } from 'tsyringe';

import { ENV_DEVELOPMENT, ENV_TEST } from '@common/constants';
import { ConfigKey, LogClient, LogLevel, LoggerCtx } from '@common/enums';
import { IAppConfig, ILoggerConfig } from '@config';

import {
  ILoggerService,
  ILoggerStreamTransportServiceInterface,
  ILoggerTransportServiceInterface,
} from '../interface';
import { LoggerInject } from '../logger.enum';

@Singleton()
export class LoggerService implements ILoggerService {
  private readonly logger: pino.Logger;

  constructor(
    @Inject(ConfigKey.APP) private readonly appConfig: IAppConfig,
    @Inject(ConfigKey.LOGGER) private readonly loggerConfig: ILoggerConfig,
    @Inject(LoggerInject.CONSOLE_TRANSPORT_SERVICE)
    private readonly consoleTransport: ILoggerTransportServiceInterface,
    @Inject(LoggerInject.ESC_TRANSPORT_SERVICE)
    private readonly escTransport: ILoggerStreamTransportServiceInterface,
    @Inject(LoggerInject.SEQ_TRANSPORT_SERVICE)
    private readonly seqTransport: ILoggerTransportServiceInterface,
  ) {
    this.logger = this.init();
  }

  get pino() {
    return this.logger;
  }

  debug(message: string, ...optionalParams: unknown[]) {
    if (this.appConfig.env !== ENV_TEST) {
      this.call(LogLevel.DEBUG, message, optionalParams);
    }
  }

  error(message: string, ...optionalParams: unknown[]) {
    if (this.appConfig.env !== ENV_TEST) {
      this.call(LogLevel.ERROR, message, optionalParams);
    }
  }

  log(message: string, ...optionalParams: unknown[]) {
    if (
      this.appConfig.env === ENV_DEVELOPMENT ||
      message === (LoggerCtx.HTTP as string)
    ) {
      this.call(LogLevel.INFO, message, optionalParams);
    }
  }

  verbose?(message: string, ...optionalParams: unknown[]) {
    if (this.appConfig.env !== ENV_TEST) {
      this.call(LogLevel.TRACE, message, optionalParams);
    }
  }

  warn(message: string, ...optionalParams: unknown[]) {
    if (this.appConfig.env !== ENV_TEST) {
      this.call(LogLevel.WARN, message, optionalParams);
    }
  }

  protected init(): pino.Logger {
    switch (this.loggerConfig.client) {
      case LogClient.ECS: {
        const { options, stream } = this.escTransport.options;

        return pino(options, stream);
      }

      case LogClient.SEQ: {
        return pino(this.seqTransport.options);
      }
    }

    return pino(this.consoleTransport.options);
  }

  private call(level: Level, message: string, ...optionalParams: any[]) {
    let params: Record<string, any> = {};
    let args: any[] = [];
    const context: string[] = [];

    if (optionalParams.length !== 0) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      optionalParams[optionalParams.length - 1]?.forEach(
        (item: string | object) => {
          if (typeof item === 'string') {
            context.push(item);
          } else if (typeof item === 'object') {
            params = { ...params, ...item };
          }
        },
      );

      args = optionalParams.slice(0, -1);
    }

    this.logger[level](
      { level: levels.values[level], context, ...params },
      message,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      ...args,
    );
  }
}
