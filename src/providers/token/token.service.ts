import {
  DecoderOptions,
  SignerOptions,
  TokenError,
  createDecoder,
  createSigner,
  createVerifier,
} from 'fast-jwt';

import {
  TokenExpiredException,
  TokenVerifyException,
} from '@common/exceptions';
import { DateUtil } from '@common/utils';

import { ITokenService } from './interface';

export class TokenService implements ITokenService {
  decodeJwt<T>(token: string, options?: Partial<DecoderOptions>): T {
    return createDecoder(options)(token) as T;
  }

  async signJwt<T>(
    payload: T,
    secret: string,
    options?: Partial<SignerOptions>,
  ): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/require-await
    const sign = createSigner({ ...options, key: async () => secret });

    try {
      const dateNow = new Date();

      return await sign({ ...payload, iat: DateUtil.toUnix(dateNow) });
    } catch {
      throw new TokenVerifyException();
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
        throw new TokenExpiredException();
      }

      throw new TokenVerifyException();
    }
  }
}
