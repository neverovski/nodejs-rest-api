import { expect } from 'chai';

import { capitalize } from '@utils/helpers/string';

describe('capitalize Function Test', () => {
  it('Should return - true', () => {
    const data = capitalize('test');

    expect(data).to.equal('Test');
  });
});
