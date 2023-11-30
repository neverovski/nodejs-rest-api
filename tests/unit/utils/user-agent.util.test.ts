import { UserAgetUtil } from '@common/utils/user-agent.util';

describe('UserAgetUtil', () => {
  describe('getBrowser', () => {
    it('should return the browser Chrome if user agent string is valid', () => {
      const ua =
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537';

      expect(UserAgetUtil.getBrowser(ua)).toEqual('Chrome');
    });

    it('should return the browser Safari if user agent string is valid', () => {
      const ua =
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15';

      expect(UserAgetUtil.getBrowser(ua)).toEqual('Safari');
    });

    it('should return an empty string if user agent string is invalid', () => {
      const ua = 'Invalid User Agent String';

      expect(UserAgetUtil.getBrowser(ua)).toEqual('');
    });

    it('should return an empty string if user agent string is undefined', () => {
      const ua = undefined;

      expect(UserAgetUtil.getBrowser(ua)).toEqual('');
    });

    it('should return an empty string if user agent string is null', () => {
      const ua = null;

      expect(UserAgetUtil.getBrowser(ua)).toEqual('');
    });
  });

  describe('getOS', () => {
    it('should return the OS Windows if user agent string is valid', () => {
      const ua =
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537';

      expect(UserAgetUtil.getOS(ua)).toEqual('Windows');
    });

    it('should return the browser macOS if user agent string is valid', () => {
      const ua =
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15';

      expect(UserAgetUtil.getOS(ua)).toEqual('Mac OS');
    });

    it('should return an empty string if user agent string is invalid', () => {
      const ua = 'Invalid User Agent String';

      expect(UserAgetUtil.getOS(ua)).toEqual('');
    });

    it('should return an empty string if user agent string is undefined', () => {
      const ua = undefined;

      expect(UserAgetUtil.getOS(ua)).toEqual('');
    });

    it('should return an empty string if user agent string is null', () => {
      const ua = null;

      expect(UserAgetUtil.getOS(ua)).toEqual('');
    });
  });
});
