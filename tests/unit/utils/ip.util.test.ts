import { IpUtil } from '@common/utils/ip.util';

describe('IpUtil', () => {
  describe('getIp', () => {
    it('should return cf-connecting-ip if it exists', () => {
      const req = { headers: { 'cf-connecting-ip': '192.0.2.1' } };
      const ip = IpUtil.getIp(req);

      expect(ip).toEqual('192.0.2.1');
    });

    it('should return x-real-ip if cf-connecting-ip does not exist', () => {
      const req = { headers: { 'x-real-ip': '192.0.2.2' } };
      const ip = IpUtil.getIp(req);

      expect(ip).toEqual('192.0.2.2');
    });

    it('should return x-forwarded-for if cf-connecting-ip and x-real-ip do not exist', () => {
      const req = { headers: { 'x-forwarded-for': '192.0.2.3' } };
      const ip = IpUtil.getIp(req);

      expect(ip).toEqual('192.0.2.3');
    });

    it('should return req.ip if headers do not exist', () => {
      const req = { ip: '192.0.2.4' };
      const ip = IpUtil.getIp(req);

      expect(ip).toEqual('192.0.2.4');
    });

    it('should return null if no ip is found', () => {
      const req = {};
      const ip = IpUtil.getIp(req);

      expect(ip).toBeNull();
    });

    it('should return the first ip if x-forwarded-for is an array', () => {
      const req = {
        headers: { 'x-forwarded-for': ['192.0.2.5', '192.0.2.6'] },
      };
      const ip = IpUtil.getIp(req);

      expect(ip).toEqual('192.0.2.5');
    });

    it('should return the first ip if x-forwarded-for is a string of ips', () => {
      const req = { headers: { 'x-forwarded-for': '192.0.2.7, 192.0.2.8' } };
      const ip = IpUtil.getIp(req);

      expect(ip).toEqual('192.0.2.7');
    });
  });
});
