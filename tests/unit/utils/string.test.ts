import { expect } from 'chai';

import { StringUtil } from '../../../src/utils';

describe('StringUtil.capitalize - Function Test', () => {
  it('Should return - What is Lorem Ipsum?', () => {
    expect(StringUtil.capitalize('what is Lorem Ipsum?')).to.equal(
      'What is Lorem Ipsum?',
    );
  });

  it('Should return - When An UnKNoWn P1rInter', () => {
    expect(StringUtil.capitalize('when An UnKNoWn P1rInter')).to.equal(
      'When An UnKNoWn P1rInter',
    );
  });

  it('Should return - Where does it come from?', () => {
    expect(StringUtil.capitalize('Where does it come from?')).to.equal(
      'Where does it come from?',
    );
  });

  it('Should return - <Empty>', () => {
    expect(StringUtil.capitalize('')).to.equal('');
  });
});
