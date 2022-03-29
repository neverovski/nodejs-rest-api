import { expect, assert } from 'chai';

import { DateHelper } from '@utils';

describe('toDate Function Test', () => {
  it('Should return - 1623322800', () => {
    const date = '2021-06-10T11:00:00.000Z';

    assert.deepEqual(DateHelper.toDate(date), new Date(Date.parse(date)));
  });

  it('Should return - 1608489900', () => {
    const date = '2020-12-21T02:45:00+08:00';

    assert.deepEqual(DateHelper.toDate(date), new Date(Date.parse(date)));
  });
});

describe('toUnix Function Test', () => {
  it('Should return - 1623322800', () => {
    const date = '2021-06-10T11:00:00.000Z';

    expect(DateHelper.toUnix(new Date(Date.parse(date)))).to.equal(1623322800);
  });

  it('Should return - 1608489900', () => {
    const date = '2020-12-21T02:45:00+08:00';

    expect(DateHelper.toUnix(new Date(Date.parse(date)))).to.equal(1608489900);
  });
});

describe('toFormat Function Test', () => {
  it('Should return - 06 10 2021, 11:00', () => {
    const date = '2021-06-10T11:00:00.000Z';

    expect(
      DateHelper.toFormat(new Date(Date.parse(date)), 'MM dd yyyy, HH:mm'),
    ).to.equal('06 10 2021, 11:00');
  });

  it('Should return - 2020-12-20 18:45', () => {
    const date = '2020-12-21T02:45:00+08:00';

    expect(
      DateHelper.toFormat(new Date(Date.parse(date)), 'yyyy-MM-dd HH:mm'),
    ).to.equal('2020-12-20 18:45');
  });
});
