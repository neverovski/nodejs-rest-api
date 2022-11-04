import { i18n } from '../i18n';

import { ExceptionError } from './class';
import { CODE_RESPONSE } from './exception.constant';
import { HttpCode } from './exception.type';
import { IException } from './interface';

class Exception implements IException {
  getError(code: HttpCode, options?: Partial<ExceptionType>): ExceptionError {
    return new ExceptionError(this.handleCode(code, options));
  }

  getOk(code: HttpCode, options?: Partial<ExceptionType>): ExceptionType {
    return this.handleCode(code, options);
  }

  private handleCode(code: HttpCode, options?: Partial<ExceptionType>) {
    const response = CODE_RESPONSE[code];

    return {
      ...response,
      ...options,
      ...(response.message && {
        message: (i18n()[response.message] || response.message) as string,
      }),
      ...(options?.message && {
        message: (i18n()[options.message] || options.message) as string,
      }),
    };
  }
}

export default new Exception();
