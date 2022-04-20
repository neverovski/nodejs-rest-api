import { HttpException } from '@core';

import {
  CodeResponse,
  HttpExceptionType,
  IHttpException,
} from '../code-response';

export default (() => {
  const error = (code: HttpExceptionType): HttpException =>
    new HttpException({
      ...CodeResponse[code],
    });

  const success = (code: HttpExceptionType): IHttpException =>
    CodeResponse[code];

  return { error, success };
})();
