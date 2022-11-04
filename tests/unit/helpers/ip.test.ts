import { expect } from 'chai';

import { IPHelper } from '../../../src/helpers';
import { ReqData } from '../data';

describe('IPHelper.getIP - Function Test', () => {
  ReqData.forEach((req) => {
    const ip = IPHelper.getIP(req);

    it(`Should return - ${ip}`, () => {
      expect(req.data.ip).to.equal(ip);
    });
  });
});
