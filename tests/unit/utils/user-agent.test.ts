import { expect } from 'chai';

import { UserAgentUtil } from '../../../src/utils';
import { UserAgentMock } from '../data-mocks';

describe('UserAgentUtil.getBrowser - Function Test', () => {
  it('Should return - Chrome', () => {
    expect(UserAgentUtil.getBrowser(UserAgentMock.UA_MAC_CHROME)).to.equal(
      'Chrome',
    );
  });

  it('Should return - Arora', () => {
    expect(UserAgentUtil.getBrowser(UserAgentMock.UA_WINDOWS_ARORA)).to.equal(
      'Arora',
    );
  });

  it('Should return - Mobile Safari', () => {
    expect(UserAgentUtil.getBrowser(UserAgentMock.UA_IOS_SAFARI)).to.equal(
      'Mobile Safari',
    );
  });

  it('Should return - UCBrowser', () => {
    expect(
      UserAgentUtil.getBrowser(UserAgentMock.UA_ANDROID_UC_BROWSER),
    ).to.equal('UCBrowser');
  });

  it('Should return - <Empty>', () => {
    expect(UserAgentUtil.getBrowser('')).to.equal('');
  });
});

describe('UserAgentUtil.getOS - Function Test', () => {
  it('Should return - Mac OS', () => {
    expect(UserAgentUtil.getOS(UserAgentMock.UA_MAC_CHROME)).to.equal('Mac OS');
  });

  it('Should return - Windows', () => {
    expect(UserAgentUtil.getOS(UserAgentMock.UA_WINDOWS_ARORA)).to.equal(
      'Windows',
    );
  });

  it('Should return - iOS', () => {
    expect(UserAgentUtil.getOS(UserAgentMock.UA_IOS_SAFARI)).to.equal('iOS');
  });

  it('Should return - Android', () => {
    expect(UserAgentUtil.getOS(UserAgentMock.UA_ANDROID_UC_BROWSER)).to.equal(
      'Android',
    );
  });

  it('Should return - <Empty>', () => {
    expect(UserAgentUtil.getOS('')).to.equal('');
  });
});
