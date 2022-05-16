import pino, { DestinationStream, Level, LoggerOptions, Logger } from 'pino';

import {
  ENV_TEST,
  PRETTY_PRINT,
  LoggerType,
  LoggerCtxError,
  LoggerCtxInfo,
} from '@utils';

export default class LoggerCore {
  readonly pino: Logger;
  private readonly debugLogger: Logger;
  private readonly env: string;
  private readonly errorLogger: Logger;
  private readonly fatalLogger: Logger;
  private readonly infoLogger: Logger;
  private readonly name: string;
  private readonly stream?: DestinationStream;
  private readonly traceLogger: Logger;
  private readonly warnLogger: Logger;

  constructor({
    name,
    stream,
    env,
  }: {
    env: string;
    name: string;
    stream?: DestinationStream;
  }) {
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

  private createPino(level?: Level): Logger {
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
