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
      errorLikeObjectKeys: ['err', 'error'],
      serializers: { error: pino.stdSerializers.err },
    });
    this.errorLogger = pino({
      name: `${app.name.toLowerCase()}::error`,
      level: 'error',
      errorLikeObjectKeys: ['err', 'error'],
      serializers: { error: pino.stdSerializers.err },
      PRETTY_PRINT,
    });
    this.warnLogger = pino({
      name: `${app.name.toLowerCase()}::warn`,
      level: 'warn',
      errorLikeObjectKeys: ['err', 'error'],
      serializers: { error: pino.stdSerializers.err },
      PRETTY_PRINT,
    });
    this.infoLogger = pino({
      name: `${app.name.toLowerCase()}::info`,
      level: 'info',
      PRETTY_PRINT,
    });
    this.debugLogger = pino({
      name: `${app.name.toLowerCase()}::debug`,
      level: 'debug',
      PRETTY_PRINT,
    });
    this.traceLogger = pino({
      name: `${app.name.toLowerCase()}::trace`,
      level: 'trace',
      PRETTY_PRINT,
    });
  }

  debug(message: string): void {
    if (AppConfig.env !== ENV_TEST) {
      this.debugLogger.debug(message);
    }
  }

  error(message: string, error: Error | any, meta?: any): void {
    if (AppConfig.env !== ENV_TEST) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.errorLogger.error({ error }, message, meta);
    }
  }

  fatal(message: string, error: Error | any, meta?: any): void {
    if (AppConfig.env !== ENV_TEST) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.fatalLogger.fatal({ error }, message, meta);
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

  warn(message: string, error: Error | any, meta?: any): void {
    if (AppConfig.env !== ENV_TEST) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.warnLogger.warn({ error }, message, meta);
    }
  }
}

export default new Logger({ name: AppConfig?.name || '' });
