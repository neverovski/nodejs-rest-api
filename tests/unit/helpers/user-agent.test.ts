import { expect } from 'chai';

import { UserAgentHelper } from '@utils/helpers';

import { UserAgentData } from '../data';

describe('UserAgentHelper.getBrowser - Function Test', () => {
  it('Should return - Chrome', () => {
    expect(UserAgentHelper.getBrowser(UserAgentData.UA_MAC_CHROME)).to.equal(
      'Chrome',
    );
  });

  it('Should return - Arora', () => {
    expect(UserAgentHelper.getBrowser(UserAgentData.UA_WINDOWS_ARORA)).to.equal(
      'Arora',
    );
  });

  it('Should return - Mobile Safari', () => {
    expect(UserAgentHelper.getBrowser(UserAgentData.UA_IOS_SAFARI)).to.equal(
      'Mobile Safari',
    );
  });

  it('Should return - UCBrowser', () => {
    expect(
      UserAgentHelper.getBrowser(UserAgentData.UA_ANDROID_UC_BROWSER),
    ).to.equal('UCBrowser');
  });

  it('Should return - <Empty>', () => {
    expect(UserAgentHelper.getBrowser('')).to.equal('');
  });
});

describe('UserAgentHelper.getOS - Function Test', () => {
  it('Should return - Mac OS', () => {
    expect(UserAgentHelper.getOS(UserAgentData.UA_MAC_CHROME)).to.equal(
      'Mac OS',
    );
  });

  it('Should return - Windows', () => {
    expect(UserAgentHelper.getOS(UserAgentData.UA_WINDOWS_ARORA)).to.equal(
      'Windows',
    );
  });

  it('Should return - iOS', () => {
    expect(UserAgentHelper.getOS(UserAgentData.UA_IOS_SAFARI)).to.equal('iOS');
  });

  it('Should return - Android', () => {
    expect(UserAgentHelper.getOS(UserAgentData.UA_ANDROID_UC_BROWSER)).to.equal(
      'Android',
    );
  });

  it('Should return - <Empty>', () => {
    expect(UserAgentHelper.getOS('')).to.equal('');
  });
});
