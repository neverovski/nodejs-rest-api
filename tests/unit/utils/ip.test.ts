import { expect } from 'chai';

import { IpUtil } from '../../../src/utils';
import { ReqMock } from '../data-mocks';

describe('IpUtil.getIP - Function Test', () => {
  ReqMock.forEach((req) => {
    const ip = IpUtil.getIp(req);

    it(`Should return - ${ip || ''}`, () => {
      expect(req.data.ip).to.equal(ip);
    });
  });
});
