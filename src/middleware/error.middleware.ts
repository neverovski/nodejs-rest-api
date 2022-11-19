import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

import { MiddlewareCore } from '@core';
import { CODE_RESPONSE, Exception, HttpCode, HttpStatus } from '@libs';

class ErrorMiddleware extends MiddlewareCore {
  handler(): ErrorRequestHandler {
    return (
      error: ExceptionOption,
      _req: Request,
      res: Response,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _next: NextFunction,
    ) => {
      let response = CODE_RESPONSE.SERVER_ERROR;

      if (
        error.name === 'EntityNotFound' ||
        error.name === 'EntityNotFoundError'
      ) {
        response = CODE_RESPONSE.NOT_FOUND;
      } else if (error.status === HttpStatus.BadRequest) {
        response = {
          ...error,
          message: error.message || CODE_RESPONSE.SERVER_ERROR.message,
          code: HttpCode.BAD_REQUEST,
        };
      } else if (error.code && error.status && error.message) {
        response = { ...error };
      }

      const errorRes = Exception.getOk(HttpCode.SERVER_ERROR, response);

      res.status(errorRes.status).json(errorRes);
    };
  }
}

export default new ErrorMiddleware();
