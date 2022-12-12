import pino, { Level, Logger as LoggerPino } from 'pino';

import { ENV_DEVELOPMENT, ENV_TEST, LogLevel, LoggerType } from '@utils';

import { ILogger } from './interface';
import { LoggerCtx, LoggerInitial } from './logger.type';

export default class Logger implements ILogger {
  readonly pino: LoggerPino;
  private readonly debugLogger: LoggerPino;
  private readonly env: string;
  private readonly errorLogger: LoggerPino;
  private readonly fatalLogger: LoggerPino;
  private readonly infoLogger: LoggerPino;
  private readonly name: string;
  private readonly traceLogger: LoggerPino;
  private readonly transport: LoggerInitial['transport'];
  private readonly warnLogger: LoggerPino;

  constructor({ name, transport, env }: LoggerInitial) {
    this.name = name;
    this.transport = transport;
    this.env = env;

    this.fatalLogger = this.createPino(LogLevel.FATAL);
    this.errorLogger = this.createPino(LogLevel.ERROR);
    this.warnLogger = this.createPino(LogLevel.WARN);
    this.infoLogger = this.createPino(LogLevel.INFO);
    this.debugLogger = this.createPino(LogLevel.DEBUG);
    this.traceLogger = this.createPino(LogLevel.TRACE);

    this.pino = this.createPino();
  }

  debug({ message, ...ctx }: LoggerCtx): void {
    if (this.env === ENV_DEVELOPMENT) {
      this.debugLogger.debug({ type: LoggerType.SERVER, ...ctx }, message);
    }
  }

  error({ message, ...ctx }: LoggerCtx): void {
    if (this.env !== ENV_TEST) {
      this.errorLogger.error({ type: LoggerType.SERVER, ...ctx }, message);
    }
  }

  fatal({ message, ...ctx }: LoggerCtx): void {
    if (this.env !== ENV_TEST) {
      this.fatalLogger.fatal({ type: LoggerType.SERVER, ...ctx }, message);
    }
  }

  info({ message, ...ctx }: LoggerCtx): void {
    if (this.env === ENV_DEVELOPMENT) {
      this.infoLogger.info({ type: LoggerType.SERVER, ...ctx }, message);
    }
  }

  trace({ message, ...ctx }: LoggerCtx): void {
    if (this.env !== ENV_TEST) {
      this.traceLogger.trace({ type: LoggerType.SERVER, ...ctx }, message);
    }
  }

  warn({ message, ...ctx }: LoggerCtx): void {
    if (this.env !== ENV_TEST) {
      this.warnLogger.warn({ type: LoggerType.SERVER, ...ctx }, message);
    }
  }

  private createPino(level?: Level): LoggerPino {
    return pino({
      name: this.name,
      ...(level && { level }),
      ...(level !== 'info' &&
        level !== 'trace' &&
        level !== 'debug' && {
          errorLikeObjectKeys: ['err', 'error'],
          serializers: { error: pino.stdSerializers.err },
        }),
      transport: this.transport,
    });
  }
}
