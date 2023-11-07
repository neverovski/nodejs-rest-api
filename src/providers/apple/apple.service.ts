import { JwksClient } from 'jwks-rsa';
import { inject } from 'tsyringe';

import { LoggerCtx, SocialNetwork } from '@common/enums';
import { PlatformPayload } from '@common/types';
import { IPlatformConfig, PlatformConfig } from '@config';
import { ProviderServiceCore } from '@core/service';
import { i18n } from '@i18n';

import { ITokenService, TokenInject } from '../token';

import { AppleKey, AppleTokenPayload } from './apple.type';
import { IAppleService } from './interface';

export class AppleService extends ProviderServiceCore implements IAppleService {
  private readonly client: JwksClient;
  private readonly platformConfig: IPlatformConfig;

  constructor(
    @inject(TokenInject.SERVICE)
    private readonly tokenService: ITokenService,
  ) {
    super(LoggerCtx.APPLE);

    this.platformConfig = PlatformConfig;
    this.client = new JwksClient({ jwksUri: this.platformConfig.apple.url });
  }

  async getPlatformPayload(token: string): Promise<PlatformPayload> {
    try {
      const data = await this.verify(token);

      return {
        ssid: data.sub,
        name: SocialNetwork.APPLE,
        ...(data?.email && {
          email: data.email.toLowerCase(),
        }),
      };
    } catch (err) {
      throw this.handleError(err);
    }
  }

  private async getKeys(): Promise<AppleKey[]> {
    try {
      return (await this.client.getKeys()) as AppleKey[];
    } catch (err) {
      throw this.handleError(err);
    }
  }

  private async getPublicKey(kid: string): Promise<string> {
    try {
      const signingKey = await this.client.getSigningKey(kid);

      return signingKey.getPublicKey();
    } catch (err) {
      throw this.handleError(err);
    }
  }

  private async verify(token: string): Promise<AppleTokenPayload> {
    try {
      const keys = await this.getKeys();
      const publicKey = keys.map((key) => this.getPublicKey(key.kid));
      const publicKeys = await Promise.all(publicKey);
      const verifiedTokenPromises = publicKeys.map((key) =>
        this.tokenService
          .verifyJwt<AppleTokenPayload>(token, key)
          .catch(() => null),
      );

      const decodedTokens = await Promise.all(verifiedTokenPromises);
      const data = decodedTokens.filter((elem) => elem).pop();

      if (!data) {
        throw this.handleError({ message: i18n()['notFound.default'] });
      }

      return data;
    } catch (err) {
      throw this.handleError(err);
    }
  }
}
