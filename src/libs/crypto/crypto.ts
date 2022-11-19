import crypto from 'crypto';

import {
  SignerOptions,
  TokenError,
  createSigner,
  createVerifier,
} from 'fast-jwt';

import { DateUtil } from '@utils';

import { Exception, HttpCode } from '../exception';

import { ICrypto } from './interface';

class Crypto implements ICrypto {
  generateUUID() {
    return crypto.randomUUID();
  }

  async signJwt<T>(
    payload: T,
    secret: string,
    options?: Partial<SignerOptions>,
  ): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/require-await
    const sign = createSigner({ ...options, key: async () => secret });

    try {
      return await sign({ ...payload, iat: DateUtil.toUnix() });
    } catch {
      throw Exception.getError(HttpCode.TOKEN_VERIFY);
    }
  }

  async verifyJwt<T>(token: string, secret: string): Promise<T> {
    // eslint-disable-next-line @typescript-eslint/require-await
    const verify = createVerifier({ key: async () => secret });

    try {
      return (await verify(token)) as T;
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (err && err?.code === TokenError.codes.expired) {
        throw Exception.getError(HttpCode.TOKEN_EXPIRED);
      }
      throw Exception.getError(HttpCode.TOKEN_VERIFY);
    }
  }
}

export default new Crypto();
