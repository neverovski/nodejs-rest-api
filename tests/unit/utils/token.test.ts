import { expect } from 'chai';

import { TokenUtil } from '../../../src/utils';
import { ReqMock } from '../data-mocks';

describe('TokenUtil.getFromHeader - Function Test', () => {
  ReqMock.forEach((req) => {
    const accessToken = TokenUtil.getFromHeader(req.headers);

    it(`Should return - ${req.data.headerAccessToken || 'null'}`, () => {
      expect(req.data.headerAccessToken).to.equal(accessToken);
    });
  });
});

describe('TokenUtil.getFromCookies - Function Test', () => {
  ReqMock.forEach((req) => {
    const accessToken = TokenUtil.getFromCookies(req.cookies);

    it(`Should return - ${req.data.cookieAccessToken || 'null'}`, () => {
      expect(req.data.cookieAccessToken).to.equal(accessToken);
    });
  });
});
