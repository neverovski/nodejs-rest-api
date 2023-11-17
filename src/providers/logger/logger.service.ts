import escFormat from '@elastic/ecs-pino-format';
import {
  DestinationStream,
  Level,
  LoggerOptions,
  TransportSingleOptions,
  levels,
  pino,
} from 'pino';
import pinoElasticsearch from 'pino-elasticsearch';

import { ENV_DEVELOPMENT, ENV_TEST } from '@common/constants';
import { LogClient, LogLevel } from '@common/enums';
import { AppConfig, IAppConfig, ILoggerConfig, LoggerConfig } from '@config';

import { ILoggerService } from './interface';
import {
  LOGGER_SEARCH_INDEX,
  PRETTY_PRINT,
  SETTING_PINO,
} from './logger.constant';

export class LoggerService implements ILoggerService {
  private readonly appConfig: IAppConfig;
  private readonly logger: pino.Logger;
  private readonly loggerConfig: ILoggerConfig;

  constructor() {
    this.appConfig = AppConfig;
    this.loggerConfig = LoggerConfig;

    this.logger = this.init();
  }

  get pino() {
    return this.logger;
  }

  private get options() {
    let transport: TransportSingleOptions = this.getTransportConsole();
    let stream: DestinationStream | null = null;
    let format: LoggerOptions | null = null;

    switch (this.loggerConfig.client) {
      case LogClient.ECS: {
        if (this.loggerConfig.url && this.loggerConfig.apiKey) {
          stream = this.getTransportEsc();
          format = escFormat();
        }

        break;
      }

      case LogClient.SEQ: {
        if (this.loggerConfig.url && this.loggerConfig.apiKey) {
          transport = this.getTransportSeq();
        }

        break;
      }
    }

    return { transport, stream, format };
  }

  debug(message: any, ...optionalParams: any[]) {
    if (AppConfig.env === ENV_DEVELOPMENT) {
      this.call(LogLevel.DEBUG, message, optionalParams);
    }
  }

  error(message: any, ...optionalParams: any[]) {
    if (AppConfig.env !== ENV_TEST) {
      this.call(LogLevel.ERROR, message, optionalParams);
    }
  }

  log(message: any, ...optionalParams: any[]) {
    if (AppConfig.env === ENV_DEVELOPMENT) {
      this.call(LogLevel.INFO, message, optionalParams);
    }
  }

  verbose?(message: any, ...optionalParams: any[]) {
    if (AppConfig.env !== ENV_TEST) {
      this.call(LogLevel.TRACE, message, optionalParams);
    }
  }

  warn(message: any, ...optionalParams: any[]) {
    if (AppConfig.env !== ENV_TEST) {
      this.call(LogLevel.WARN, message, optionalParams);
    }
  }

  protected init(): pino.Logger {
    const { stream, format, transport } = this.options;

    if (stream && format) {
      return pino(
        {
          ...SETTING_PINO,
          name: this.appConfig.name,
          enabled: this.loggerConfig.enabled,
          ...format,
        },
        stream,
      );
    }

    return pino({
      ...SETTING_PINO,
      name: this.appConfig.name,
      enabled: this.loggerConfig.enabled,
      transport,
    });
  }

  private call(level: Level, message: any, ...optionalParams: any[]) {
    let params: Record<string, any> = {};
    let args: any[] = [];
    const context: string[] = [];

    if (optionalParams.length !== 0) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      message,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      ...args,
    );
  }

  private getTransportConsole(): TransportSingleOptions {
    return {
      target: 'pino-pretty',
      options: { destination: 1, ...PRETTY_PRINT },
    };
  }

  private getTransportEsc(): DestinationStream {
    return pinoElasticsearch({
      index: (logTime) => {
        return `${LOGGER_SEARCH_INDEX}-${logTime.substring(5, 10)}`;
      },
      node: this.loggerConfig.url,
      esVersion: 8,
      flushBytes: 1000,
      auth: { apiKey: this.loggerConfig.apiKey as string },
      ...(this.loggerConfig?.ssl?.ca && {
        tls: {
          ca: this.loggerConfig.ssl.ca,
          rejectUnauthorized: false,
        },
      }),
      opType: 'create',
    });
  }

  private getTransportSeq(): TransportSingleOptions {
    return {
      target: '@autotelic/pino-seq-transport',
      options: {
        loggerOpts: {
          serverUrl: this.loggerConfig.url,
          apiKey: this.loggerConfig.apiKey,
        },
      },
    };
  }
}
