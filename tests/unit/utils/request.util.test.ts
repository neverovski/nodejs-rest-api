import fetchMock from 'jest-fetch-mock';

import { RequestUtil } from '@common/utils/request.util';

describe('RequestUtil', () => {
  beforeAll(() => {
    fetchMock.enableMocks();
  });

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('get', () => {
    it('should return the expected data when the request is successful', async () => {
      const mockUrl = 'https://api.github.com/users/github';
      const mockResponse = { login: 'github' };

      fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

      const result = await RequestUtil.get(mockUrl);

      expect(result).toEqual(mockResponse);
      expect(fetchMock).toHaveBeenCalledWith(mockUrl, {
        headers: { 'Content-Type': 'application/json' },
      });
    });

    it('should throw an error when the request fails', async () => {
      const mockUrl = 'http://example.com';
      const mockError = 'Request failed';

      fetchMock.mockRejectOnce(new Error(mockError));

      await expect(RequestUtil.get(mockUrl)).rejects.toThrow(mockError);
    });

    it('should throw an error when the response is not ok', async () => {
      const mockUrl = 'http://example.com';
      const mockError = 'Not Found';

      fetchMock.mockResponseOnce(mockError, { status: 404 });

      await expect(RequestUtil.get(mockUrl)).rejects.toThrow(mockError);
    });
  });

  describe('post', () => {
    it('should return the expected data when the request is successful', async () => {
      const mockUrl = 'https://api.github.com/users/github';
      const mockData = { login: 'github' };
      const mockResponse = { login: 'github' };

      fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

      const result = await RequestUtil.post(mockUrl, mockData);

      expect(result).toEqual(mockResponse);
      expect(fetchMock).toHaveBeenCalledWith(mockUrl, {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockData),
        method: 'POST',
      });
    });

    it('should throw an error when the request fails', async () => {
      const mockUrl = 'http://example.com';
      const mockData = { login: 'github' };
      const mockError = 'Request failed';

      fetchMock.mockRejectOnce(new Error(mockError));

      await expect(RequestUtil.post(mockUrl, mockData)).rejects.toThrow(
        mockError,
      );
    });

    it('should throw an error when the response is not ok', async () => {
      const mockUrl = 'http://example.com';
      const mockData = { login: 'github' };
      const mockError = 'Not Found';

      fetchMock.mockResponseOnce(mockError, { status: 404 });

      await expect(RequestUtil.post(mockUrl, mockData)).rejects.toThrow(
        mockError,
      );
    });
  });
});
