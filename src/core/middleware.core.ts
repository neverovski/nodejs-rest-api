import { RequestHandler, ErrorRequestHandler } from 'express';

import { Logger } from '@utils/index';

export default abstract class MiddlewareCore {
  init(): void {
    Logger.trace(`${this.constructor.name} initialized...`);
  }

  abstract handler(data?: any): RequestHandler | ErrorRequestHandler;
}
