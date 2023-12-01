import type {
  ErrorRequestHandler,
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction,
} from 'express';
import { singleton as Singleton } from 'tsyringe';

import { HttpStatus } from '@common/enums';
import {
  HttpException,
  InternalServerErrorException,
} from '@common/exceptions';
import { MiddlewareCore } from '@core';

@Singleton()
export class ErrorMiddleware extends MiddlewareCore {
  handler(): ErrorRequestHandler {
    return (
      err: HttpException,
      _req: ExpressRequest,
      res: ExpressResponse,
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
