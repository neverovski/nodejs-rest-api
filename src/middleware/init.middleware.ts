import { NextFunction, Request, RequestHandler, Response } from 'express';

import { AppConfig } from '@config';
import { MiddlewareCore } from '@core';

class InitMiddleware extends MiddlewareCore {
  handler(): RequestHandler {
    return (_req: Request, res: Response, next: NextFunction) => {
      res.header('X-Server', AppConfig.name);
      next();
    };
  }
}

export default new InitMiddleware();
