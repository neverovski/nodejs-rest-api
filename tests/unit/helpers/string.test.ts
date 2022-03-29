import { expect } from 'chai';

import { StringHelper } from '@utils';

describe('capitalize Function Test', () => {
  it('Should return - true', () => {
    const data = StringHelper.capitalize('test');

    expect(data).to.equal('Test');
  });
});
