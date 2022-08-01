import pino, {
  DestinationStream,
  Level,
  LoggerOptions,
  Logger as LoggerPino,
} from 'pino';

import {
  ENV_TEST,
  LoggerCtxError,
  LoggerCtxInfo,
  LoggerType,
  PRETTY_PRINT,
} from '@utils';

import { ILogger } from './interface';
import { LoggerInitial } from './logger.type';

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

  debug(data: LoggerCtxInfo): void {
    if (this.env !== ENV_TEST) {
      const { message, ...obj } = data;

      this.debugLogger.debug({ type: LoggerType.SERVER, ...obj }, message);
    }
  }

  error(data: LoggerCtxError): void {
    if (this.env !== ENV_TEST) {
      const { message, ...obj } = data;

      this.errorLogger.error({ type: LoggerType.SERVER, ...obj }, message);
    }
  }

  fatal(data: LoggerCtxError): void {
    if (this.env !== ENV_TEST) {
      const { message, ...obj } = data;

      this.fatalLogger.fatal({ type: LoggerType.SERVER, ...obj }, message);
    }
  }

  info(data: LoggerCtxInfo): void {
    if (this.env !== ENV_TEST) {
      const { message, ...obj } = data;

      this.infoLogger.info({ type: LoggerType.SERVER, ...obj }, message);
    }
  }

  trace(data: LoggerCtxInfo): void {
    if (this.env !== ENV_TEST) {
      const { message, ...obj } = data;

      this.traceLogger.trace({ type: LoggerType.SERVER, ...obj }, message);
    }
  }

  warn(data: LoggerCtxError): void {
    if (this.env !== ENV_TEST) {
      const { message, ...obj } = data;

      this.warnLogger.warn({ type: LoggerType.SERVER, ...obj }, message);
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
