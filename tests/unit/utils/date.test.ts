import { assert, expect } from 'chai';

import { DateUtil } from '../../../src/utils';

describe('DateUtil.toDate - Function Test', () => {
  it('Should return - 2021-06-10T11:00:00.000Z', () => {
    const date = '2021-06-10T11:00:00.000Z';

    assert.deepEqual(DateUtil.toDate(date), new Date(Date.parse(date)));
  });

  it('Should return - 2020-12-20T18:45:00.000Z', () => {
    const date = '2020-12-21T02:45:00+08:00';

    assert.deepEqual(DateUtil.toDate(date), new Date(Date.parse(date)));
  });
});

describe('DateUtil.toUnix - Function Test', () => {
  it('Should return - 1623322800', () => {
    const date = '2021-06-10T11:00:00.000Z';

    expect(DateUtil.toUnix(date)).to.equal(1623322800);
  });

  it('Should return - 1608489900', () => {
    const date = '2020-12-21T02:45:00+08:00';

    expect(DateUtil.toUnix(date)).to.equal(1608489900);
  });
});

describe('DateUtil.toUTC - Function Test', () => {
  it('Should return - 06 10 2021, 11:00', () => {
    const date = '2021-06-10T11:00:00.000Z';

    expect(DateUtil.toUTC(date, 'MM dd yyyy, HH:mm')).to.equal(
      '06 10 2021, 11:00',
    );
  });

  it('Should return - 2020-12-20 18:45', () => {
    const date = '2020-12-21T02:45:00+08:00';

    expect(DateUtil.toUTC(date, 'yyyy-MM-dd HH:mm')).to.equal(
      '2020-12-20 18:45',
    );
  });

  it('Should return - 2020-12-21, 09:45', () => {
    const date = '2020-12-21T02:45:00-07:00';

    expect(DateUtil.toUTC(date, 'yyyy-MM-dd, HH:mm')).to.equal(
      '2020-12-21, 09:45',
    );
  });
});
