import jwt from 'jsonwebtoken';

import { getUnixTimeOfDate, httpError, HttpExceptionType } from '@utils/index';

class JWTService {
  decode(
    token: string,
    options?: jwt.DecodeOptions,
  ): null | { [key: string]: any } | string {
    return jwt.decode(token, options);
  }

  sign<T>(payload: T, secret: string, opts?: jwt.SignOptions): string {
    return jwt.sign({ ...payload, iat: getUnixTimeOfDate() }, secret, opts);
  }

  signAsync<T>(
    payload: T,
    secret: string,
    opts?: jwt.SignOptions,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { ...payload, iat: getUnixTimeOfDate() },
        secret,
        opts || {},
        (err, encoded) => (err ? reject(err) : resolve(encoded as string)),
      );
    });
  }

  verify<T>(token: string, secret: string) {
    return jwt.verify(token, secret) as T;
  }

  verifyAsync<T>(token: string, secret: string): Promise<T> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (error, decoded) => {
        if (error && error.name === 'TokenExpiredError') {
          return reject(httpError(HttpExceptionType.TOKEN_EXPIRED));
        }
        if (decoded) {
          return resolve(decoded as unknown as T);
        }

        return reject(httpError(HttpExceptionType.TOKEN_MALFORMED));
      });
    });
  }
}

export default new JWTService();
