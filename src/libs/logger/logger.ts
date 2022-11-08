import pino, {
  DestinationStream,
  Level,
  LoggerOptions,
  Logger as LoggerPino,
} from 'pino';

import { ENV_TEST, LoggerType } from '@utils';

import { ILogger } from './interface';
import { PRETTY_PRINT } from './logger.constant';
import { LoggerCtx, LoggerInitial } from './logger.type';

export default class Logger implements ILogger {
  readonly pino: LoggerPino;
  private readonly debugLogger: LoggerPino;
  private readonly env: string;
  private readonly errorLogger: LoggerPino;
  private readonly fatalLogger: LoggerPino;
  private readonly infoLogger: LoggerPino;
  private readonly name: string;
  private readonly stream?: DestinationStream;
  private readonly traceLogger: LoggerPino;
  private readonly warnLogger: LoggerPino;

  constructor({ name, stream, env }: LoggerInitial) {
    this.name = name;
    this.stream = stream;
    this.env = env;

    this.fatalLogger = this.createPino('fatal');
    this.errorLogger = this.createPino('error');
    this.warnLogger = this.createPino('warn');
    this.infoLogger = this.createPino('info');
    this.debugLogger = this.createPino('debug');
    this.traceLogger = this.createPino('trace');

    this.pino = this.createPino();
  }

  debug({ message, ...ctx }: LoggerCtx): void {
    if (this.env !== ENV_TEST) {
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
    if (this.env !== ENV_TEST) {
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
    const opt: LoggerOptions = {
      name: `${this.name}${level ? '::' + level : ''}`,
      ...(level && { level }),
      ...(level !== 'info' &&
        level !== 'trace' &&
        level !== 'debug' && {
          errorLikeObjectKeys: ['err', 'error'],
          serializers: { error: pino.stdSerializers.err },
        }),
      ...(level !== 'fatal' && { PRETTY_PRINT }),
    };

    return this.stream ? pino(opt, this.stream) : pino(opt);
  }
}
