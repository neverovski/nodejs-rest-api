import type {
  ErrorRequestHandler,
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction,
} from 'express';
import { singleton as Singleton } from 'tsyringe';

import { HttpStatus, MessageCode } from '@common/enums';
import { HttpException } from '@common/exceptions';
import { Exception, ExceptionMessage } from '@common/types';
import { MiddlewareCore } from '@core';

@Singleton()
export class ErrorMiddleware extends MiddlewareCore {
  handler(): ErrorRequestHandler {
    return (
      exception: HttpException,
      _req: ExpressRequest,
      res: ExpressResponse,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _next: NextFunction,
    ) => {
      const data = this.createResponseData(exception);

      res.status(data.statusCode).json({ data });
    };
  }

  protected createResponseData(exception: HttpException): Exception {
    const statusCode = this.extractStatusCode(exception);
    const messageCode = this.extractMessageCode(statusCode, exception);
    const message = this.extractMessage(exception);

    return { statusCode, messageCode, message };
  }

  private extractMessage(exception: HttpException): ExceptionMessage {
    if (typeof exception === 'object' && 'message' in exception) {
      return exception.message as ExceptionMessage;
    }

    return exception;
  }

  private extractMessageCode(
    httpStatus: HttpStatus,
    exception: HttpException,
  ): MessageCode {
    if (typeof exception === 'object' && 'messageCode' in exception) {
      return exception.messageCode;
    }

    const httpStatusKey =
      httpStatus in HttpStatus ? HttpStatus[httpStatus] : '';

    return (MessageCode[httpStatusKey] ||
      MessageCode.INTERNAL_SERVER_ERROR) as MessageCode;
  }

  private extractStatusCode(exception: HttpException) {
    return exception?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
