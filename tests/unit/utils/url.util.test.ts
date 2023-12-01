import { UrlUtil } from '@common/utils/url.util';

describe('UrlUtil', () => {
  describe('getDomain', () => {
    it('should return the domain name when a valid URL is provided', () => {
      const url = 'https://www.example.com/path?query=param';
      const domain = UrlUtil.getDomain(url);

      expect(domain).toEqual('www.example.com');
    });

    it('should return "localhost" when the URL is not provided', () => {
      const domain = UrlUtil.getDomain();

      expect(domain).toEqual('localhost');
    });

    it('should return "localhost" when the URL is invalid', () => {
      const url = 'invalid url';
      const domain = UrlUtil.getDomain(url);

      expect(domain).toEqual('localhost');
    });

    it('should return "localhost" when the URL is "localhost"', () => {
      const url = 'localhost';
      const domain = UrlUtil.getDomain(url);

      expect(domain).toEqual('localhost');
    });
  });

  describe('createUrl', () => {
    it('should return the URL with search parameters when valid URL and search parameters are provided', () => {
      const urlInput = 'https://www.example.com/path';
      const searchParams = { query: 'param', anotherQuery: 'anotherParam' };
      const url = UrlUtil.createUrl(urlInput, searchParams);

      expect(url).toEqual(
        'https://www.example.com/path?query=param&anotherQuery=anotherParam',
      );
    });

    it('should return the original URL when search parameters are not provided', () => {
      const urlInput = 'https://www.example.com/path';
      const url = UrlUtil.createUrl(urlInput);

      expect(url).toEqual(urlInput);
    });

    it('should return the original URL when the URL is invalid', () => {
      const urlInput = 'invalid url';
      const searchParams = { query: 'param' };
      const url = UrlUtil.createUrl(urlInput, searchParams);

      expect(url).toEqual(urlInput);
    });

    it('should not append null or undefined search parameters', () => {
      const urlInput = 'https://www.example.com/path';
      const searchParams = {
        query: 'param',
        nullQuery: null,
        undefinedQuery: undefined,
      };
      const url = UrlUtil.createUrl(urlInput, searchParams);

      expect(url).toEqual('https://www.example.com/path?query=param');
    });
  });
});
