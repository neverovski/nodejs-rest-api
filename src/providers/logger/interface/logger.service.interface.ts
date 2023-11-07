import type { Logger } from 'pino';

export interface ILoggerService {
  pino: Logger;
  debug(message: any, ...optionalParams: any[]): any;
  error(message: any, ...optionalParams: any[]): any;
  log(message: any, ...optionalParams: any[]): any;
  verbose?(message: any, ...optionalParams: any[]): any;
  warn(message: any, ...optionalParams: any[]): any;
}
