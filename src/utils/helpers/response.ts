import { HttpExceptionCore } from '@core';

import { CodeResponse, HttpException } from '../code-response';

export default (() => {
  const error = (code: HttpException): HttpExceptionCore =>
    new HttpExceptionCore({
      ...CodeResponse[code],
    });

  const success = (code: HttpException): HttpExceptionType =>
    CodeResponse[code];

  const custom = (ctx?: Partial<HttpExceptionType>): HttpExceptionCore => {
    return new HttpExceptionCore(ctx);
  };

  return { error, success, custom };
})();
