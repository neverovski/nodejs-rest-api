import { RequestHandler, ErrorRequestHandler } from 'express';

import Logger from './logger';

export default abstract class MiddlewareCore {
  init(): void {
    Logger.trace(`${this.constructor.name} initialized...`);
  }

  abstract handler(data?: any): RequestHandler | ErrorRequestHandler;
}
