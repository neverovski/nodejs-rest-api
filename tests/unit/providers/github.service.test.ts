import 'reflect-metadata';

import { PlatformName } from '@common/enums';
import { InternalServerErrorException } from '@common/exceptions';
import { RequestUtil } from '@common/utils';
import { IGitHubService } from '@providers/github';
import { GitHubService } from '@providers/github/github.service';
import { loggerMock } from '__mocks__/logger.service.mock';
import { platformConfigMock } from '__mocks__/platform.config.mock';

describe('GitHubService', () => {
  let githubService: IGitHubService;

  beforeEach(() => {
    githubService = new GitHubService(platformConfigMock, loggerMock);
  });

  describe('getPayload', () => {
    it('should return the payload if the token is valid', async () => {
      const token = 'valid token';
      const data = {
        id: '123',
        email: 'TEST@EMAIL.COM',
        html_url: 'https://github.com/test',
        name: 'Test User',
      };
      const expectedPayload = {
        ssid: '123',
        name: PlatformName.GITHUB,
        url: 'https://github.com/test',
        email: 'test@email.com',
        profile: {
          firstName: 'Test User',
        },
      };

      jest.spyOn(RequestUtil, 'get').mockResolvedValue(data);

      const payload = await githubService.getPayload(token);

      expect(payload).toEqual(expectedPayload);
    });

    it('should return the payload without email and name if the token is valid and no email and name are provided', async () => {
      const token = 'valid token';
      const data = { id: '123', html_url: 'https://github.com/test' };
      const expectedPayload = {
        ssid: '123',
        name: PlatformName.GITHUB,
        url: 'https://github.com/test',
      };

      jest.spyOn(RequestUtil, 'get').mockResolvedValue(data);

      const payload = await githubService.getPayload(token);

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
        .spyOn(githubService as never, 'handleError')
        .mockImplementation(() => {
          throw errorResult;
        });

      await expect(githubService.getPayload(token)).rejects.toThrow(
        errorResult,
      );
    });
  });
});
