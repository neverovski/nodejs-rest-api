import { IpUtil } from '@common/utils/ip.util';

import { IpUtilMock } from '../__mocks__/utils/ip.util.mock';

describe('IpUtil', () => {
  describe('getIp', () => {
    IpUtilMock.forEach(({ headers, ip }, index) => {
      it(`Valid - ${index}`, () => {
        const ipIn = IpUtil.getIp({ headers });

        expect(ipIn).toEqual(ip);
      });
    });
  });
});
