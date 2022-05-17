import { expect } from 'chai';

import { IPHelper } from '@utils/helpers';

import { ReqData } from '../data';

describe('IPHelper.getIP - Function Test', () => {
  let ip: string;
  let req: { headers: any; ip: string };

  ReqData.forEach((item) => {
    beforeEach(() => {
      req = item;

      ip = IPHelper.getIP({ headers: item.headers });
    });

    it('Should return ip', () => {
      expect(req.ip).to.be.equal(ip);
    });
  });
});
