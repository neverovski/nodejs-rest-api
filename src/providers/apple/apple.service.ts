import { JwksClient } from 'jwks-rsa';
import { singleton, inject } from 'tsyringe';

import { PlatformConfig } from '@config';
import { ServiceCore } from '@core';
import { PlatformProvider, PlatformNetwork } from '@modules/platform';
import { JwtInject, IJwtService } from '@providers/jwt';
import { HttpException } from '@utils';
import { ResponseHelper } from '@utils/helpers';

import { AppleKey, AppleTokenPayload } from './apple.type';
import { IAppleService } from './interface';

@singleton()
export default class AppleService extends ServiceCore implements IAppleService {
  private readonly client: JwksClient;

  constructor(
    @inject(JwtInject.JWT_SERVICE) private readonly jwtService: IJwtService,
  ) {
    super();

    this.client = new JwksClient({ jwksUri: PlatformConfig.apple.url });

    this.init();
  }

  async getProfile(token: string): Promise<PlatformProvider> {
    try {
      const data = await this.verify(token);

      return {
        ssid: data.sub,
        name: PlatformNetwork.APPLE,
        ...(data?.email && {
          email: data.email.toLowerCase(),
        }),
      };
    } catch (err) {
      this.errorHandler(err);

      throw ResponseHelper.error(HttpException.TOKEN_VERIFY);
    }
  }

  private async getKeys(): Promise<AppleKey[]> {
    try {
      const keys = await this.client.getKeys();

      return keys as AppleKey[];
    } catch (err) {
      this.errorHandler(err);

      throw ResponseHelper.error(HttpException.EXTERNAL);
    }
  }

  private async getPublicKey(kid: string): Promise<string> {
    try {
      const signingKey = await this.client.getSigningKey(kid);

      return signingKey.getPublicKey();
    } catch (err) {
      this.errorHandler(err);

      throw ResponseHelper.error(HttpException.EXTERNAL);
    }
  }

  private async verify(token: string): Promise<AppleTokenPayload> {
    try {
      const keys = await this.getKeys();
      const publicKey = keys.map((key) => this.getPublicKey(key.kid));
      const publicKeys = await Promise.all(publicKey);
      const verifiedTokenPromises = publicKeys.map((key) =>
        this.jwtService
          .verifyAsync<AppleTokenPayload>(token, key)
          .catch(() => null),
      );

      const decodedTokens = await Promise.all(verifiedTokenPromises);
      const data = decodedTokens.filter((elem) => elem).pop();

      if (!data) {
        throw ResponseHelper.error(HttpException.TOKEN_VERIFY);
      }

      return data;
    } catch (err) {
      this.errorHandler(err);

      throw ResponseHelper.error(HttpException.EXTERNAL);
    }
  }
}
