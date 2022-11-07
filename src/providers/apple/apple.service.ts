import { JwksClient } from 'jwks-rsa';

import { PlatformConfig } from '@config';
import { ServiceCore } from '@core';
import { Crypto, Exception, HttpCode } from '@lib';
import { PlatformPayload, SocialNetwork } from '@utils';

import { AppleKey, AppleTokenPayload } from './apple.type';
import { IAppleService } from './interface';

export default class AppleService extends ServiceCore implements IAppleService {
  private readonly client: JwksClient;

  constructor() {
    super();

    this.client = new JwksClient({ jwksUri: PlatformConfig.apple.url });

    this.init();
  }

  async getProfile(token: string): Promise<PlatformPayload> {
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
      this.handleError(err);

      throw Exception.getError(HttpCode.EXTERNAL);
    }
  }

  private async getKeys(): Promise<AppleKey[]> {
    try {
      return (await this.client.getKeys()) as AppleKey[];
    } catch (err) {
      this.handleError(err);

      throw Exception.getError(HttpCode.EXTERNAL);
    }
  }

  private async getPublicKey(kid: string): Promise<string> {
    try {
      const signingKey = await this.client.getSigningKey(kid);

      return signingKey.getPublicKey();
    } catch (err) {
      this.handleError(err);

      throw Exception.getError(HttpCode.EXTERNAL);
    }
  }

  private async verify(token: string): Promise<AppleTokenPayload> {
    try {
      const keys = await this.getKeys();
      const publicKey = keys.map((key) => this.getPublicKey(key.kid));
      const publicKeys = await Promise.all(publicKey);
      const verifiedTokenPromises = publicKeys.map((key) =>
        Crypto.verifyJWTAsync<AppleTokenPayload>(token, key).catch(() => null),
      );

      const decodedTokens = await Promise.all(verifiedTokenPromises);
      const data = decodedTokens.filter((elem) => elem).pop();

      if (!data) {
        throw Exception.getError(HttpCode.EXTERNAL);
      }

      return data;
    } catch (err) {
      this.handleError(err);

      throw Exception.getError(HttpCode.EXTERNAL);
    }
  }
}
