import pino from 'pino';

import { AppConfig } from '@config/index';
import { ENV_TEST, PRETTY_PRINT } from '@utils/index';

interface ILogger {
  name: string;
}

export class Logger {
  private readonly debugLogger: pino.Logger;
  private readonly errorLogger: pino.Logger;
  private readonly fatalLogger: pino.Logger;
  private readonly infoLogger: pino.Logger;
  private readonly traceLogger: pino.Logger;
  private readonly warnLogger: pino.Logger;

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

  debug(message: string): void {
    if (AppConfig.env !== ENV_TEST) {
      this.debugLogger.debug(message);
    }
  }

  error(message: string, error: Error, meta?: any): void {
    if (AppConfig.env !== ENV_TEST) {
      this.errorLogger.error(message, meta || error.toString());
    }
  }

  fatal(message: string, error: Error, meta?: any): void {
    if (AppConfig.env !== ENV_TEST) {
      this.fatalLogger.fatal(message, meta || error.toString());
    }
  }

  info(message: string): void {
    if (AppConfig.env !== ENV_TEST) {
      this.infoLogger.info(message);
    }
  }

  trace(message: string): void {
    if (AppConfig.env !== ENV_TEST) {
      this.traceLogger.trace(message);
    }
  }

  warn(message: string, error: Error, meta?: any): void {
    if (AppConfig.env !== ENV_TEST) {
      this.warnLogger.warn(message, meta || error.toString());
    }
  }

  private logMethod(args: any[], method: pino.LogFn): void {
    if (args.length === 2) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      args[0] = `${args[0]} %j`;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    method.apply(this, args);
  }
}

export default new Logger({ name: AppConfig?.name || '' });
