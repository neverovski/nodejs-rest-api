import { LoggerCtxError, LoggerCtxInfo } from '@utils';

export interface ILogger {
  debug(data: LoggerCtxInfo): void;
  error(data: LoggerCtxError): void;
  fatal(data: LoggerCtxError): void;
  info(data: LoggerCtxInfo): void;
  trace(data: LoggerCtxInfo): void;
  warn(data: LoggerCtxError): void;
}
