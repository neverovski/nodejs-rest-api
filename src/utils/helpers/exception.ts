import { HttpExceptionCore } from '@core';
import { i18n } from '@lib';
import { CodeResponse, HttpException } from '@utils';

const getException = (
  code: HttpException,
  options?: Partial<HttpExceptionType>,
) => {
  const response = CodeResponse[code];

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
};

export const getError = (
  code: HttpException,
  options?: Partial<HttpExceptionType>,
): HttpExceptionCore => {
  return new HttpExceptionCore(getException(code, options));
};

export const getOk = (
  code: HttpException,
  options?: Partial<HttpExceptionType>,
): HttpExceptionType => {
  return getException(code, options);
};
