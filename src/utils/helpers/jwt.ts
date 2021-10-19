import { IncomingHttpHeaders } from 'http';

import { SignOptions, sign, verify } from 'jsonwebtoken';

import { HttpExceptionType, TokenType } from '../utility-types';

import { convertToUnixTime } from './date';
import { codeError } from './response';

export const verifyToken = async <T>(
  token: string,
  secret: string,
): Promise<T> => {
  return new Promise((resolve, reject) => {
    verify(token, secret, (error, decoded) => {
      if (error && error.name === 'TokenExpiredError') {
        return reject(codeError(HttpExceptionType.TOKEN_EXPIRED));
      }

      if (decoded) {
        return resolve(decoded as unknown as T);
      }

      return reject(codeError(HttpExceptionType.TOKEN_MALFORMED));
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

export const getTokenFromHeader = (
  headers: IncomingHttpHeaders,
): string | null => {
  const authorization = headers.authorization || headers.Authorization;

  if (
    authorization &&
    typeof authorization === 'string' &&
    authorization.startsWith(`${TokenType.BEARER} `)
  ) {
    return authorization.split(`${TokenType.BEARER} `)[1] || null;
  }

  return null;
};

export const getTokenFromCookies = (cookies: any): string | null => {
  const { accessToken } = cookies as { accessToken: string };

  return accessToken || null;
};
