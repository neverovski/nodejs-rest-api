import { expect } from 'chai';

import { TokenUtil } from '../../../src/utils';
import { ReqData } from '../data';

describe('TokenUtil.getFromHeader - Function Test', () => {
  ReqData.forEach((req) => {
    const accessToken = TokenUtil.getFromHeader(req.headers);

    it(`Should return - ${req.data.headerAccessToken || 'null'}`, () => {
      expect(req.data.headerAccessToken).to.equal(accessToken);
    });
  });
});

describe('TokenUtil.getFromCookies - Function Test', () => {
  ReqData.forEach((req) => {
    const accessToken = TokenUtil.getFromCookies(req.cookies);

    it(`Should return - ${req.data.cookieAccessToken || 'null'}`, () => {
      expect(req.data.cookieAccessToken).to.equal(accessToken);
    });
  });
});
