import fetchMock from 'jest-fetch-mock';

import { InternalServerErrorException } from '@common/exceptions';
import { RequestUtil } from '@common/utils/request.util';

import { RequestUtilMock } from '../__mocks__/utils/request.util.mock';
import { setupFetch } from '../test.helper';

describe('RequestUtil', () => {
  beforeAll(() => {
    setupFetch();
  });

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('GET', () => {
    const body = JSON.stringify(RequestUtilMock.case1.body);
    const url = RequestUtilMock.case1.url;

    it('Valid request', async () => {
      fetchMock.mockResponseOnce(body);
      const res = await RequestUtil.get<{ login: string }>(url);

      expect(fetchMock).toBeCalled();
      expect(fetchMock).toBeCalledWith(url, {
        headers: RequestUtilMock.case1.headers,
      });
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(res).toHaveProperty('login');
      expect(res.login).toEqual('github');
    });

    it('Invalid request', async () => {
      fetchMock.mockReject(new InternalServerErrorException());

      await expect(RequestUtil.get(url, {})).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('POST', () => {
    const body = RequestUtilMock.case2.body;
    const url = RequestUtilMock.case2.url;

    it('Valid request', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(body));

      const res = await RequestUtil.post<{ userId: number }>(url, body, {
        headers: RequestUtilMock.case2.headers,
      });

      expect(fetchMock).toBeCalled();
      expect(fetchMock).toBeCalledWith(url, {
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        method: 'POST',
      });
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(res.userId).toEqual(1);
    });

    it('Invalid request', async () => {
      fetchMock.mockReject(new InternalServerErrorException());

      await expect(RequestUtil.post(url, {})).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
