import { UserAgetUtil } from '@common/utils/user-agent.util';

import { UserAgentUtilMock } from '../__mocks__/utils/user-agent.util.mock';

describe('UserAgetUtil', () => {
  describe('getBrowser', () => {
    UserAgentUtilMock.forEach(({ dataIn, dataOut }) => {
      it(`)Should return - ${dataOut.browser}`, () => {
        expect(UserAgetUtil.getBrowser(dataIn)).toEqual(dataOut.browser);
      });
    });

    it('Should return - <Empty>', () => {
      expect(UserAgetUtil.getBrowser('')).toEqual('');
    });
  });

  describe('getOS', () => {
    UserAgentUtilMock.forEach(({ dataIn, dataOut }) => {
      it(`)Should return - ${dataOut.os}`, () => {
        expect(UserAgetUtil.getOS(dataIn)).toEqual(dataOut.os);
      });
    });

    it('Should return - <Empty>', () => {
      expect(UserAgetUtil.getOS('')).toEqual('');
    });
  });
});
