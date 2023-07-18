import { Logger as TypeOrmLogger } from 'typeorm';

import { ENV_DEVELOPMENT } from '@common/constants';
import { LoggerType } from '@common/enums';
import { StringUtil } from '@common/utils';
import { AppConfig } from '@config';
import { Logger as LoggerApp } from '@providers/logger';

export class Logger implements TypeOrmLogger {
  log(level: 'log' | 'info' | 'warn', message: string) {
    switch (level) {
      case 'log':
        LoggerApp.log(message, { type: LoggerType.SQL });
        break;
      case 'info':
        LoggerApp.debug(message, { type: LoggerType.SQL });
        break;
      case 'warn':
        LoggerApp.warn(message, { type: LoggerType.SQL });
        break;
    }
  }

  logMigration(message: string) {
    LoggerApp.log(message);
  }

  logQuery(query: string, parameters?: unknown[]) {
    if (AppConfig.env === ENV_DEVELOPMENT) {
      query +=
        parameters && parameters.length
          ? ` -- PARAMETERS: ${StringUtil.transformJsonToString(parameters)}`
          : '';
    }

    LoggerApp.log(query, { type: LoggerType.SQL });
  }

  logQueryError(error: string, query: string, parameters?: unknown[]) {
    if (AppConfig.env === ENV_DEVELOPMENT) {
      query +=
        parameters && parameters.length
          ? ` -- PARAMETERS: ${StringUtil.transformJsonToString(parameters)}`
          : '';
    }

    LoggerApp.error(`${query} -- ${error}`, { type: LoggerType.SQL });
  }

  logQuerySlow(time: number, query: string, parameters?: unknown[]) {
    if (AppConfig.env === ENV_DEVELOPMENT) {
      query +=
        parameters && parameters.length
          ? ` -- PARAMETERS: ${StringUtil.transformJsonToString(parameters)}`
          : '';
    }

    LoggerApp.warn(`Time: ${time} -- ${query}`, { type: LoggerType.SQL });
  }

  logSchemaBuild(message: string) {
    LoggerApp.log(message, { type: LoggerType.SQL });
  }
}
