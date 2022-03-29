import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';

import { MiddlewareCore, HttpException } from '@core';
import { CodeResponse } from '@utils';

class ErrorMiddleware extends MiddlewareCore {
  handler(): ErrorRequestHandler {
    return (
      error: HttpException,
      _req: Request,
      res: Response,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _next: NextFunction,
    ) => {
      let response = CodeResponse.SERVER_ERROR;

      if (
        error.name === 'EntityNotFound' ||
        error.name === 'EntityNotFoundError'
      ) {
        response = CodeResponse.NOT_FOUND;
      } else if (error.code && error.status && error.message) {
        response = { ...error };
      }

      const errorRes = new HttpException(response);

      res.status(errorRes.status).json(errorRes);
    };
  }
}

export default new ErrorMiddleware();
