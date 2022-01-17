import { HttpException } from '@core/index';

import {
  CodeResponse,
  HttpExceptionType,
  IHttpException,
} from '../code-response';

export default (() => {
  const error = (code: HttpExceptionType): HttpException => {
    return new HttpException({
      ...CodeResponse[code],
    });
  };

  const success = (code: HttpExceptionType): IHttpException => {
    return CodeResponse[code];
  };

  return {
    error,
    success,
  };
})();
