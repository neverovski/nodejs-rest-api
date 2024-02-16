import { JwksClient } from 'jwks-rsa';
import { inject as Inject, singleton as Singleton } from 'tsyringe';

import { ConfigKey, PlatformName } from '@common/enums';
import { PlatformPayload } from '@common/types';
import { IPlatformConfig } from '@config';
import { ProviderServiceCore } from '@core/service';
import { i18n } from '@i18n';
import { ILoggerService, LoggerInject } from '@providers/logger';

import { ITokenService, TokenInject } from '../token';

import { AppleKey, AppleTokenPayload } from './apple.type';
import { IAppleService } from './interface';

@Singleton()
export class AppleService extends ProviderServiceCore implements IAppleService {
  private readonly client: JwksClient;

  constructor(
    @Inject(ConfigKey.PLATFORM)
    private readonly platformConfig: IPlatformConfig,
    @Inject(LoggerInject.SERVICE) protected readonly logger: ILoggerService,
    @Inject(TokenInject.SERVICE) private readonly tokenService: ITokenService,
  ) {
    super();

    this.client = new JwksClient({ jwksUri: this.platformConfig.apple.url });
  }

  async getPayload(token: string): Promise<PlatformPayload> {
    try {
      const data = await this.verify(token);

      return {
        ssid: data.sub,
        name: PlatformName.APPLE,
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
