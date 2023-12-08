import 'reflect-metadata';

import { PlatformName } from '@common/enums';
import { InternalServerErrorException } from '@common/exceptions';
import { IGoogleService } from '@providers/google';
import { GoogleService } from '@providers/google/google.service';
import { loggerMock } from '__mocks__/logger.service.mock';
import { platformConfigMock } from '__mocks__/platform.config.mock';

describe('GoogleService', () => {
  let googleService: IGoogleService;

  beforeEach(() => {
    googleService = new GoogleService(platformConfigMock, loggerMock);
  });

  describe('getPayload', () => {
    it('should return the payload if the token is valid', async () => {
      const token = 'valid token';
      const data = {
        sub: '123',
        email: 'TEST@EMAIL.COM',
        given_name: 'John',
        family_name: 'Doe',
      };
      const expectedPayload = {
        ssid: '123',
        name: PlatformName.GOOGLE,
        email: 'test@email.com',
        profile: {
          firstName: 'John',
          lastName: 'Doe',
        },
      };

      jest
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .spyOn(googleService as any, 'getTokenPayload')
        .mockResolvedValue(data);

      const payload = await googleService.getPayload(token);

      expect(payload).toEqual(expectedPayload);
    });

    it('should return the payload without email and name if the token is valid and no email and name are provided', async () => {
      const token = 'valid token';
      const data = { sub: '123' };
      const expectedPayload = {
        ssid: '123',
        name: PlatformName.GOOGLE,
      };

      jest
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .spyOn(googleService as any, 'getTokenPayload')
        .mockResolvedValue(data);

      const payload = await googleService.getPayload(token);

      expect(payload).toEqual(expectedPayload);
    });

    it('should throw an error if the token is invalid', async () => {
      const token = 'invalid token';
      const error = new InternalServerErrorException();

      jest
        .spyOn(googleService as never, 'getTokenPayload')
        .mockImplementation(() => {
          throw error;
        });

      await expect(googleService.getPayload(token)).rejects.toThrow(error);
    });
  });
});
