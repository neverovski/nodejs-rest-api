import { Logger as LoggerOrm } from 'typeorm';

import { LoggerType } from '@utils';

import Logger from './logger';

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

  logMigration(info: string) {
    Logger.debug({ message: 'DB migration', info, type: LoggerType.DB });
  }

  logQuery(query: string, parameters?: any[]) {
    const info =
      query +
      (parameters && parameters.length
        ? ` -- PARAMETERS: ${this.stringify(parameters)}`
        : '');

    Logger.debug({ message: this.message, info, type: LoggerType.DB });
  }

  logQueryError(error: string, query: string, parameters?: any[]) {
    const info =
      query +
      (parameters && parameters.length
        ? ` -- PARAMETERS: ${this.stringify(parameters)}`
        : '');

    Logger.error({
      message: `${this.message} error`,
      error,
      info,
      type: LoggerType.DB,
    });
  }

  logQuerySlow(_time: number, query: string, parameters?: any[]) {
    const info =
      query +
      (parameters && parameters.length
        ? ` -- PARAMETERS: ${this.stringify(parameters)}`
        : '');

    Logger.info({
      message: `${this.message} slow`,
      info,
      type: LoggerType.DB,
    });
  }

  logSchemaBuild(info: string) {
    Logger.debug({
      message: 'DB schema build',
      info,
      type: LoggerType.DB,
    });
  }

  protected stringify(parameters: any[]) {
    try {
      return JSON.stringify(parameters);
    } catch (error) {
      // most probably circular objects in parameters
      return parameters as unknown as string;
    }
  }
}
