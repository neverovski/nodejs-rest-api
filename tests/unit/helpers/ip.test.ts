import { expect } from 'chai';

import { IPHelper } from '@utils/helpers';

import { ReqMock } from '../mock';

describe('IPHelper.getIP - Function Test', () => {
  ReqMock.forEach((req) => {
    const ip = IPHelper.getIP(req);

    it(`Should return - ${ip}`, () => {
      expect(req.data.ip).to.equal(ip);
    });
  });
});
