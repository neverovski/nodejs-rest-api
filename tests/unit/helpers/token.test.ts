import { expect } from 'chai';

import { TokenHelper } from '@utils/helpers';

import { ReqMock } from '../mock';

describe('TokenHelper.getFromHeader - Function Test', () => {
  ReqMock.forEach((req) => {
    const accessToken = TokenHelper.getFromHeader(req.headers);

    it(`Should return - ${req.data.headerAccessToken || 'null'}`, () => {
      expect(req.data.headerAccessToken).to.equal(accessToken);
    });
  });
});

describe('TokenHelper.getFromCookies - Function Test', () => {
  ReqMock.forEach((req) => {
    const accessToken = TokenHelper.getFromCookies(req.cookies);

    it(`Should return - ${req.data.cookieAccessToken || 'null'}`, () => {
      expect(req.data.cookieAccessToken).to.equal(accessToken);
    });
  });
});
