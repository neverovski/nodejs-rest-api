import { Logger as OrmLogger } from 'typeorm';

import { LoggerCtx } from '@common/enums';
import type { ILoggerService } from '@providers/logger';

export class DatabaseLogger implements OrmLogger {
  private readonly loggerCtx: LoggerCtx;

  constructor(protected readonly loggerService: ILoggerService) {
    this.loggerCtx = LoggerCtx.SQL;
  }

  log(level: 'log' | 'info' | 'warn', message: string) {
    const name = 'DB log';

    if (level === 'log') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this.loggerService.log(name, { message, context: this.loggerCtx });
    }

    if (level === 'info') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this.loggerService.debug(name, {
        message,
        context: this.loggerCtx,
      });
    }

    if (level === 'warn') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this.loggerService.warn(name, {
        message,
        context: this.loggerCtx,
      });
    }
  }

  logMigration(query: string) {
    this.loggerService.log('DB migration', { query, context: this.loggerCtx });
  }

  logQuery(query: string, parameters?: unknown[]) {
    this.loggerService.log('DB query', {
      query,
      parameters,
      context: this.loggerCtx,
    });
  }

  logQueryError(err: string, query: string, parameters?: unknown[]) {
    this.loggerService.error('DB query error', {
      err,
      query,
      parameters,
      context: this.loggerCtx,
    });
  }

  logQuerySlow(time: number, query: string, parameters?: unknown[]) {
    this.loggerService.warn(`DB slow query took ${time} ms`, {
      query,
      parameters,
      context: this.loggerCtx,
    });
  }

  logSchemaBuild(query: string) {
    this.loggerService.log('DB schema', { query, context: this.loggerCtx });
  }
}
