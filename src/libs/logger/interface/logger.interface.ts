import { LoggerCtx } from '../logger.type';

export interface ILogger {
  debug(ctx: LoggerCtx): void;
  error(ctx: LoggerCtx): void;
  fatal(ctx: LoggerCtx): void;
  info(ctx: LoggerCtx): void;
  trace(ctx: LoggerCtx): void;
  warn(ctx: LoggerCtx): void;
}
