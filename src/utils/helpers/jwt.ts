import { SignOptions, sign, verify } from 'jsonwebtoken';

import { HttpExceptionType } from '../utility-types';

import { convertToUnixTime } from './date';
import { responseError } from './response';

export const verifyToken = async <T>(
  token: string,
  secret: string,
): Promise<T> => {
  return new Promise((resolve, reject) => {
    verify(token, secret, (error, decoded) => {
      if (error && error.name === 'TokenExpiredError') {
        return reject(responseError(HttpExceptionType.TOKEN_EXPIRED));
      }

      if (decoded) {
        return resolve(decoded as unknown as T);
      }

      return reject(responseError(HttpExceptionType.TOKEN_MALFORMED));
    });
  });
};

export const generateToken = <T>(
  payload: T,
  secret: string,
  opts?: SignOptions,
): string => {
  return sign({ ...payload, iat: convertToUnixTime() }, secret, opts);
};
