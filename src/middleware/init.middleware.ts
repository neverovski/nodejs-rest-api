import { Request, Response, NextFunction, RequestHandler } from 'express';

import { AppConfig } from '@config/index';
import { MiddlewareCore } from '@core/index';

class InitMiddleware extends MiddlewareCore {
  handler(): RequestHandler {
    return (_req: Request, res: Response, next: NextFunction) => {
      res.header('X-Server', AppConfig.name);
      next();
    };
  }
}

export default new InitMiddleware();
