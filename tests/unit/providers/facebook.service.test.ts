import 'reflect-metadata';

import { PlatformName } from '@common/enums';
import { InternalServerErrorException } from '@common/exceptions';
import { RequestUtil } from '@common/utils';
import { FACEBOOK_LINK, IFacebookService } from '@providers/facebook';
import { FacebookService } from '@providers/facebook/facebook.service';
import { loggerMock } from '__mocks__/logger.service.mock';
import { platformConfigMock } from '__mocks__/platform.config.mock';

describe('FacebookService', () => {
  let facebookService: IFacebookService;

  beforeEach(() => {
    facebookService = new FacebookService(platformConfigMock, loggerMock);
  });

  describe('getPayload', () => {
    it('should return the payload if the token is valid', async () => {
      const token = 'valid token';
      const data = {
        id: '123',
        email: 'TEST@EMAIL.COM',
        last_name: 'Doe',
        first_name: 'John',
      };
      const expectedPayload = {
        ssid: '123',
        name: PlatformName.FACEBOOK,
        url: `${FACEBOOK_LINK}/123`,
        email: 'test@email.com',
        profile: {
          lastName: 'Doe',
          firstName: 'John',
        },
      };

      jest.spyOn(RequestUtil, 'get').mockResolvedValue(data);

      const payload = await facebookService.getPayload(token);

      expect(payload).toEqual(expectedPayload);
    });

    it('should return the payload without email if the token is valid and no email is provided', async () => {
      const token = 'valid token';
      const data = { id: '123', last_name: 'Doe', first_name: 'John' };
      const expectedPayload = {
        ssid: '123',
        name: PlatformName.FACEBOOK,
        url: `${FACEBOOK_LINK}/123`,
        profile: {
          lastName: 'Doe',
          firstName: 'John',
        },
      };

      jest.spyOn(RequestUtil, 'get').mockResolvedValue(data);

      const payload = await facebookService.getPayload(token);

      expect(payload).toEqual(expectedPayload);
    });

    it('should throw an error if the token is invalid', async () => {
      const token = 'invalid token';
      const errorToken = new Error('Invalid token');
      const errorResult = new InternalServerErrorException();

      jest.spyOn(RequestUtil, 'get').mockImplementation(() => {
        throw errorToken;
      });
      jest
        .spyOn(facebookService as never, 'handleError')
        .mockImplementation(() => {
          throw errorResult;
        });

      await expect(facebookService.getPayload(token)).rejects.toThrow(
        errorResult,
      );
    });
  });
});
