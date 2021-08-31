import pino, { LogFn } from 'pino';

import { AppConfig } from '@config/index';
import { ENV_TEST, PRETTY_PRINT } from '@utils/index';

interface ILogger {
  name: string;
}

export class Logger {
  private readonly fatalLogger: pino.Logger;
  private readonly errorLogger: pino.Logger;
  private readonly warnLogger: pino.Logger;
  private readonly infoLogger: pino.Logger;
  private readonly debugLogger: pino.Logger;
  private readonly traceLogger: pino.Logger;

  constructor(app: ILogger) {
    this.fatalLogger = pino({
      name: `${app.name.toLowerCase()}::fatal`,
      level: 'fatal',
      hooks: { logMethod: this.logMethod },
    });
    this.errorLogger = pino({
      name: `${app.name.toLowerCase()}::error`,
      level: 'error',
      hooks: { logMethod: this.logMethod },
      PRETTY_PRINT,
    });
    this.warnLogger = pino({
      name: `${app.name.toLowerCase()}::warn`,
      level: 'warn',
      hooks: { logMethod: this.logMethod },
      PRETTY_PRINT,
    });
    this.infoLogger = pino({
      name: `${app.name.toLowerCase()}::info`,
      level: 'info',
      hooks: { logMethod: this.logMethod },
      PRETTY_PRINT,
    });
    this.debugLogger = pino({
      name: `${app.name.toLowerCase()}::debug`,
      level: 'debug',
      hooks: { logMethod: this.logMethod },
      PRETTY_PRINT,
    });
    this.traceLogger = pino({
      name: `${app.name.toLowerCase()}::trace`,
      level: 'trace',
      hooks: { logMethod: this.logMethod },
      PRETTY_PRINT,
    });
  }

  private logMethod(args: any[], method: LogFn): void {
    if (args.length === 2) {
      // eslint-disable-next-line no-param-reassign
      args[0] = `${args[0]} %j`;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    method.apply(this, args);
  }

  fatal(message: string, error: Error, meta?: any): void {
    if (AppConfig.env !== ENV_TEST) {
      this.fatalLogger.fatal(message, meta || error.toString());
    }
  }

  error(message: string, error: Error, meta?: any): void {
    if (AppConfig.env !== ENV_TEST) {
      this.errorLogger.error(message, meta || error.toString());
    }
  }

  warn(message: string, error: Error, meta?: any): void {
    if (AppConfig.env !== ENV_TEST) {
      this.warnLogger.warn(message, meta || error.toString());
    }
  }

  info(message: string, meta: any = {}): void {
    if (AppConfig.env !== ENV_TEST) {
      this.infoLogger.info(message, Object.keys(meta).length ? meta : '');
    }
  }

  debug(message: string, meta: any = {}): void {
    if (AppConfig.env !== ENV_TEST) {
      this.debugLogger.debug(message, Object.keys(meta).length ? meta : '');
    }
  }

  trace(message: string, meta: any = {}): void {
    if (AppConfig.env !== ENV_TEST) {
      this.traceLogger.trace(message, Object.keys(meta).length ? meta : '');
    }
  }
}

export default new Logger({ name: AppConfig?.name || '' });
