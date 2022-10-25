import crypto from 'crypto';

import jwt from 'jsonwebtoken';

import { ServiceCore } from '@core';
import { HttpException } from '@utils';
import { DateHelper, ExceptionHelper } from '@utils/helpers';

import { ICryptoService } from './interface';

export default class CryptoService
  extends ServiceCore
  implements ICryptoService
{
  constructor() {
    super();

    this.init();
  }

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
          return reject(ExceptionHelper.getError(HttpException.TOKEN_EXPIRED));
        }

        if (decoded) {
          return resolve(decoded as unknown as T);
        }

        return reject(ExceptionHelper.getError(HttpException.TOKEN_VERIFY));
      });
    });
  }
}
