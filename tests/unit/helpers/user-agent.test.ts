import { expect } from 'chai';

import { UserAgentHelper } from '@utils/helpers';

const UA_MAC_CHROME =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36';
const UA_WINDOWS_ARORA =
  'Mozilla/5.0 (Windows; U; Windows NT 5.1; de-CH) AppleWebKit/523.15 (KHTML, like Gecko, Safari/419.3) Arora/0.2';
const UA_IOS_SAFARI =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 5_0_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A405 Safari/7534.48.3';
const UA_ANDROID_UC_BROWSER =
  'Mozilla/5.0 (Linux; U; Android 2.3.4; en-US; MT11i Build/4.0.2.A.0.62) AppleWebKit/534.31 (KHTML, like Gecko) UCBrowser/9.0.1.275 U3/0.8.0 Mobile Safari/534.31';

describe('UserAgentHelper.getBrowser - Function Test', () => {
  it('Should return - Chrome', () => {
    expect(UserAgentHelper.getBrowser(UA_MAC_CHROME)).to.equal('Chrome');
  });

  it('Should return - Arora', () => {
    expect(UserAgentHelper.getBrowser(UA_WINDOWS_ARORA)).to.equal('Arora');
  });

  it('Should return - Mobile Safari', () => {
    expect(UserAgentHelper.getBrowser(UA_IOS_SAFARI)).to.equal('Mobile Safari');
  });

  it('Should return - UCBrowser', () => {
    expect(UserAgentHelper.getBrowser(UA_ANDROID_UC_BROWSER)).to.equal(
      'UCBrowser',
    );
  });

  it('Should return - <Empty>', () => {
    expect(UserAgentHelper.getBrowser('')).to.equal('');
  });
});

describe('UserAgentHelper.getOS - Function Test', () => {
  it('Should return - Mac OS', () => {
    expect(UserAgentHelper.getOS(UA_MAC_CHROME)).to.equal('Mac OS');
  });

  it('Should return - Windows', () => {
    expect(UserAgentHelper.getOS(UA_WINDOWS_ARORA)).to.equal('Windows');
  });

  it('Should return - iOS', () => {
    expect(UserAgentHelper.getOS(UA_IOS_SAFARI)).to.equal('iOS');
  });

  it('Should return - Android', () => {
    expect(UserAgentHelper.getOS(UA_ANDROID_UC_BROWSER)).to.equal('Android');
  });

  it('Should return - <Empty>', () => {
    expect(UserAgentHelper.getOS('')).to.equal('');
  });
});
