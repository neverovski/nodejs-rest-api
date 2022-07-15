import { OAuth2Client } from 'google-auth-library';
import { singleton } from 'tsyringe';

import { PlatformConfig } from '@config';
import { ServiceCore } from '@core';
import { PlatformProvider, PlatformNetwork } from '@modules/platform';
import { HttpException } from '@utils';
import { ResponseHelper } from '@utils/helpers';

import { IGoogleService } from './interface';

@singleton()
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
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: [this.clientId],
      });
      const data = ticket.getPayload();

      if (data) {
        return {
          ssid: data.sub,
          name: PlatformNetwork.GOOGLE,
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

      throw ResponseHelper.error(HttpException.BAD_REQUEST);
    } catch (err) {
      this.errorHandler(err);

      throw ResponseHelper.error(HttpException.TOKEN_VERIFY);
    }
  }
}
