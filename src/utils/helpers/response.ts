import { HttpException } from '@core/index';

import {
  CodeResponse,
  HttpExceptionType,
  IHttpException,
} from '../code-response';

export const error = (code: HttpExceptionType): HttpException => {
  return new HttpException({
    ...CodeResponse[code],
  });
};

export const success = (code: HttpExceptionType): IHttpException => {
  return CodeResponse[code];
};
