import { Logger as LoggerOrm } from 'typeorm';

import { AppConfig } from '@config';
import { Logger } from '@libs';
import { ENV_DEVELOPMENT, LoggerType } from '@utils';

export default class TypeormLogger implements LoggerOrm {
  private readonly message: string;

  constructor() {
    this.message = 'DB query';
  }

  log(level: 'log' | 'info' | 'warn', info: string) {
    switch (level) {
      case 'log':
      case 'info':
        Logger.info({ message: this.message, type: LoggerType.DB, info });
        break;
      case 'warn':
        Logger.warn({
          message: this.message,
          error: info,
          type: LoggerType.DB,
        });
        break;
    }
  }

  logMigration() {
    // Logger.debug({ message: 'DB migration', info, type: LoggerType.DB });
  }

  logQuery(query: string, parameters?: any[]) {
    if (AppConfig.env === ENV_DEVELOPMENT) {
      query +=
        parameters && parameters.length
          ? ` -- PARAMETERS: ${this.transformJsonToString(parameters)}`
          : '';
    }

    Logger.info({ message: this.message, query, type: LoggerType.DB });
  }

  logQueryError(error: string, query: string, parameters?: any[]) {
    if (AppConfig.env === ENV_DEVELOPMENT) {
      query +=
        parameters && parameters.length
          ? ` -- PARAMETERS: ${this.transformJsonToString(parameters)}`
          : '';
    }

    Logger.error({
      message: `${this.message} error`,
      error,
      query,
      type: LoggerType.DB,
    });
  }

  logQuerySlow(_time: number, query: string, parameters?: any[]) {
    if (AppConfig.env === ENV_DEVELOPMENT) {
      query +=
        parameters && parameters.length
          ? ` -- PARAMETERS: ${this.transformJsonToString(parameters)}`
          : '';
    }

    Logger.info({
      message: `${this.message} slow`,
      query,
      type: LoggerType.DB,
    });
  }

  logSchemaBuild() {
    // Logger.debug({
    //   message: 'DB schema build',
    //   info,
    //   type: LoggerType.DB,
    // });
  }

  protected transformJsonToString(parameters: any[]) {
    try {
      return JSON.stringify(parameters);
    } catch (error) {
      // most probably circular objects in parameters
      return parameters as unknown as string;
    }
  }
}
