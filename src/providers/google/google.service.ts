import { OAuth2Client, TokenPayload } from 'google-auth-library';

import { PlatformConfig } from '@config';
import { ServiceCore } from '@core';
import { Exception, HttpCode } from '@lib';
import { PlatformProvider } from '@modules/platform';
import { SocialNetwork } from '@utils';

import { IGoogleService } from './interface';

export default class GoogleService
  extends ServiceCore
  implements IGoogleService
{
  private readonly client: OAuth2Client;
  private readonly clientId: string;

  constructor() {
    super();

    this.clientId = PlatformConfig.google.clientId;
    this.client = new OAuth2Client();

    this.init();
  }

  async getProfile(token: string): Promise<PlatformProvider> {
    let data: TokenPayload | undefined;

    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: [this.clientId],
      });

      data = ticket.getPayload();
    } catch (err) {
      this.handleError(err);

      throw Exception.getError(HttpCode.EXTERNAL);
    }

    if (data) {
      return {
        ssid: data.sub,
        name: SocialNetwork.GOOGLE,
        ...(data?.email && {
          email: data.email.toLowerCase(),
        }),
        url: data.profile || '',
        ...((data?.given_name || data?.family_name) && {
          profile: {
            firstName: data?.given_name || '',
            lastName: data?.family_name || '',
          },
        }),
      };
    }

    throw Exception.getError(HttpCode.EXTERNAL);
  }
}
