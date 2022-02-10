import jwt from 'jsonwebtoken';

import { DateHelper, ResponseHelper, HttpExceptionType } from '@utils/index';

class JWTService {
  decode(
    token: string,
    options?: jwt.DecodeOptions,
  ): null | { [key: string]: any } | string {
    return jwt.decode(token, options);
  }

  sign<T>(payload: T, secret: string, opts?: jwt.SignOptions): string {
    return jwt.sign({ ...payload, iat: DateHelper.toUnix() }, secret, opts);
  }

  signAsync<T>(
    payload: T,
    secret: string,
    opts?: jwt.SignOptions,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { ...payload, iat: DateHelper.toUnix() },
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
          return reject(ResponseHelper.error(HttpExceptionType.TOKEN_EXPIRED));
        }

        if (decoded) {
          return resolve(decoded as unknown as T);
        }

        return reject(ResponseHelper.error(HttpExceptionType.TOKEN_VERIFY));
      });
    });
  }
}

export default new JWTService();
