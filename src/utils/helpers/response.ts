import { HttpExceptionCore } from '@core';
import { CodeResponse, HttpException } from '@utils';

export const error = (
  code: HttpException,
  errors?: HttpExceptionType['errors'],
): HttpExceptionCore =>
  new HttpExceptionCore({
    ...CodeResponse[code],
    errors,
  });

export const success = (code: HttpException): HttpExceptionType =>
  CodeResponse[code];

export const custom = (ctx?: Partial<HttpExceptionType>): HttpExceptionCore =>
  new HttpExceptionCore(ctx);
