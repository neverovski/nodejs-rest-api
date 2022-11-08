import { expect } from 'chai';

import { IpUtil } from '../../../src/utils';
import { ReqData } from '../data';

describe('IpUtil.getIP - Function Test', () => {
  ReqData.forEach((req) => {
    const ip = IpUtil.getIP(req);

    it(`Should return - ${ip}`, () => {
      expect(req.data.ip).to.equal(ip);
    });
  });
});
