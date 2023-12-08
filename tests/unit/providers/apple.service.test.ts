import 'reflect-metadata';

import { PlatformName } from '@common/enums';
import { InternalServerErrorException } from '@common/exceptions';
import { IAppleService } from '@providers/apple';
import { AppleService } from '@providers/apple/apple.service';
import { loggerMock } from '__mocks__/logger.service.mock';
import { platformConfigMock } from '__mocks__/platform.config.mock';
import { tokenServiceMock } from '__mocks__/token.service.mock';

jest.mock('jwks-rsa');

describe('AppleService', () => {
  let appleService: IAppleService;

  beforeEach(() => {
    appleService = new AppleService(
      platformConfigMock,
      loggerMock,
      tokenServiceMock,
    );
  });

  describe('getPayload', () => {
    it('should return the payload if the token is valid', async () => {
      const token = 'valid token';
      const data = { sub: '123', email: 'TEST@EMAIL.COM' };
      const expectedPayload = {
        ssid: '123',
        name: PlatformName.APPLE,
        email: 'test@email.com',
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jest.spyOn(appleService as any, 'verify').mockResolvedValue(data);

      const payload = await appleService.getPayload(token);

      expect(payload).toEqual(expectedPayload);
    });

    it('should return the payload without email if the token is valid and no email is provided', async () => {
      const token = 'valid token';
      const data = { sub: '123' };
      const expectedPayload = { ssid: '123', name: PlatformName.APPLE };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jest.spyOn(appleService as any, 'verify').mockResolvedValue(data);

      const payload = await appleService.getPayload(token);

      expect(payload).toEqual(expectedPayload);
    });

    it('should throw an error if the token is invalid', async () => {
      const token = 'invalid token';
      const error = new InternalServerErrorException();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jest.spyOn(appleService as any, 'verify').mockRejectedValue(error);
      jest
        .spyOn(appleService as never, 'handleError')
        .mockImplementation(() => {
          throw error;
        });

      await expect(appleService.getPayload(token)).rejects.toThrow(error);
    });
  });
});
