import { expect } from 'chai';

import { StringHelper } from '@utils/helpers';

describe('StringHelper.capitalize - Function Test', () => {
  it('Should return - What is Lorem Ipsum?', () => {
    expect(StringHelper.capitalize('what is Lorem Ipsum?')).to.equal(
      'What is Lorem Ipsum?',
    );
  });

  it('Should return - When An UnKNoWn P1rInter', () => {
    expect(StringHelper.capitalize('when An UnKNoWn P1rInter')).to.equal(
      'When An UnKNoWn P1rInter',
    );
  });

  it('Should return - Where does it come from?', () => {
    expect(StringHelper.capitalize('Where does it come from?')).to.equal(
      'Where does it come from?',
    );
  });

  it('Should return - <Empty>', () => {
    expect(StringHelper.capitalize('')).to.equal('');
  });
});
