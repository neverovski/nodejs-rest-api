import type { Logger } from 'pino';

export interface ILoggerService {
  pino: Logger;

  debug(message: string, ...optionalParams: unknown[]): void;
  error(message: string, ...optionalParams: unknown[]): void;
  log(message: string, ...optionalParams: unknown[]): void;
  verbose?(message: string, ...optionalParams: unknown[]): void;
  warn(message: string, ...optionalParams: unknown[]): void;
}
