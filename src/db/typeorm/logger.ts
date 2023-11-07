import { container } from 'tsyringe';
import { Logger as TypeOrmLogger } from 'typeorm';

import { LoggerCtx } from '@common/enums';
import { ILoggerService, LoggerInject } from '@providers/logger';

export class DbLogger implements TypeOrmLogger {
  protected readonly logger: ILoggerService;
  private readonly loggerCtx: LoggerCtx;

  constructor() {
    this.loggerCtx = LoggerCtx.SQL;
    this.logger = container.resolve<ILoggerService>(LoggerInject.SERVICE);
  }

  log(level: 'log' | 'info' | 'warn', message: string) {
    const name = 'DB log';

    if (level === 'log') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this.logger.log(name, { message, context: this.loggerCtx });
    }
    if (level === 'info') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this.logger.debug(name, { message, context: this.loggerCtx });
    }
    if (level === 'warn') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this.logger.warn(name, { message, context: this.loggerCtx });
    }
  }

  logMigration(query: string) {
    this.logger.log('DB migration', { query, context: this.loggerCtx });
  }

  logQuery(query: string, parameters?: unknown[]) {
    this.logger.log('DB query', {
      query,
      parameters,
      context: this.loggerCtx,
    });
  }

  logQueryError(err: string, query: string, parameters?: unknown[]) {
    this.logger.error('DB query error', {
      err,
      query,
      parameters,
      context: this.loggerCtx,
    });
  }

  logQuerySlow(time: number, query: string, parameters?: unknown[]) {
    this.logger.warn(`DB slow query took ${time} ms`, {
      query,
      parameters,
      context: this.loggerCtx,
    });
  }

  logSchemaBuild(query: string) {
    this.logger.log('DB schema', { query, context: this.loggerCtx });
  }
}
