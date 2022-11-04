import crypto from 'crypto';

import jwt from 'jsonwebtoken';

import { DateHelper } from '@helpers';

import { Exception, HttpCode } from '../exception';

import { ICrypto } from './interface';

class Crypto implements ICrypto {
  decodeJWT(
    token: string,
    options?: jwt.DecodeOptions,
  ): null | { [key: string]: any } | string {
    return jwt.decode(token, options);
  }

  generateUUID() {
    return crypto.randomUUID();
  }

  signJWT<T>(payload: T, secret: string, opts?: jwt.SignOptions): string {
    return jwt.sign({ ...payload, iat: DateHelper.toUnix() }, secret, opts);
  }

  signJWTAsync<T>(
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

  verifyJWT<T>(token: string, secret: string) {
    return jwt.verify(token, secret) as T;
  }

  verifyJWTAsync<T>(token: string, secret: string): Promise<T> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (error, decoded) => {
        if (error && error.name === 'TokenExpiredError') {
          return reject(Exception.getError(HttpCode.TOKEN_EXPIRED));
        }

        if (decoded) {
          return resolve(decoded as unknown as T);
        }

        return reject(Exception.getError(HttpCode.TOKEN_VERIFY));
      });
    });
  }
}

export default new Crypto();
