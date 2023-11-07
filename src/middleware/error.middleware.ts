import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from 'express';

import { HttpStatus } from '@common/enums';
import {
  HttpException,
  InternalServerErrorException,
} from '@common/exceptions';
import { MiddlewareCore } from '@core';

class ErrorMiddleware extends MiddlewareCore {
  handler(): ErrorRequestHandler {
    return (
      err: HttpException,
      _req: Request,
      res: Response,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _next: NextFunction,
    ) => {
      if (err.messageCode && err.statusCode) {
        res.status(err.statusCode).json(err);

        return;
      }

      res
        .status(HttpStatus.InternalServerError)
        .json(new InternalServerErrorException());
    };
  }
}

export default new ErrorMiddleware();
