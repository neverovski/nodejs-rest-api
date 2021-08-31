import { HttpException } from '@core/index';

import { CodeResponse } from '../code-response';
import { HttpExceptionType, IHttpException } from '../utility-types';

export const responseError = (code: HttpExceptionType): HttpException => {
  return new HttpException({
    ...CodeResponse[code],
  });
};

export const responseOk = (code: HttpExceptionType): IHttpException => {
  return CodeResponse[code];
};
