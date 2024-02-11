import { TIMEZONE_UTC } from '@common/constants';
import { DateUtil } from '@common/utils/date.util';

describe('DateUtil', () => {
  describe('addMillisecondToDate', () => {
    it('should add the specified number of milliseconds to the date', () => {
      const date = new Date('2022-01-01T00:00:00.000Z');
      const milliseconds = 1000;

      const result = DateUtil.addMillisecondToDate(date, milliseconds);

      expect(result).toEqual(new Date('2022-01-01T00:00:01.000Z'));
    });

    it('should return the same date if no milliseconds are specified', () => {
      const date = new Date('2022-01-01T00:00:00.000Z');

      const result = DateUtil.addMillisecondToDate(date);

      expect(result).toEqual(date);
    });

    it('should use the current date if no date is specified', () => {
      const now = new Date();
      const milliseconds = 1000;

      const result = DateUtil.addMillisecondToDate(new Date(), milliseconds);

      expect(result.getTime()).toBeGreaterThanOrEqual(
        now.getTime() + milliseconds,
      );
      expect(result.getTime()).toBeLessThanOrEqual(
        new Date().getTime() + milliseconds,
      );
    });

    it('should handle negative milliseconds', () => {
      const date = new Date('2022-01-01T00:00:01.000Z');
      const milliseconds = -1000;

      const result = DateUtil.addMillisecondToDate(date, milliseconds);

      expect(result).toEqual(new Date('2022-01-01T00:00:00.000Z'));
    });

    it('should handle date strings', () => {
      const date = '2022-01-01T00:00:00.000Z';
      const milliseconds = 1000;

      const result = DateUtil.addMillisecondToDate(date, milliseconds);

      expect(result).toEqual(new Date('2022-01-01T00:00:01.000Z'));
    });

    it('should handle date numbers', () => {
      const date = new Date('2022-01-01T00:00:00.000Z').getTime();
      const milliseconds = 1000;

      const result = DateUtil.addMillisecondToDate(date, milliseconds);

      expect(result).toEqual(new Date('2022-01-01T00:00:01.000Z'));
    });
  });

  describe('addMonths', () => {
    it('should add the specified number of months to the date', () => {
      const date = new Date('2022-01-01T00:00:00.000Z');
      const months = 1;

      const result = DateUtil.addMonths(date, months);

      expect(result).toEqual(new Date('2022-02-01T00:00:00.000Z'));
    });

    it('should return the same date if no months are specified', () => {
      const date = new Date('2022-01-01T00:00:00.000Z');

      const result = DateUtil.addMonths(date);

      expect(result).toEqual(date);
    });

    it('should use the current date if no date is specified', () => {
      const date = new Date('2024-02-11T09:01:10.390Z');
      const months = 1;

      const result = DateUtil.addMonths(date, months);

      expect(result).toEqual(new Date('2024-03-11T09:01:10.390Z'));
    });

    it('should handle negative months', () => {
      const date = new Date('2022-01-01T00:00:00.000Z');
      const months = -1;

      const result = DateUtil.addMonths(date, months);

      expect(result).toEqual(new Date('2021-12-01T00:00:00.000Z'));
    });

    it('should handle date strings', () => {
      const date = '2022-01-01T00:00:00.000Z';
      const months = 1;

      const result = DateUtil.addMonths(date, months);

      expect(result).toEqual(new Date('2022-02-01T00:00:00.000Z'));
    });

    it('should handle date numbers', () => {
      const date = new Date('2022-01-01T00:00:00.000Z').getTime();
      const months = 1;

      const result = DateUtil.addMonths(date, months);

      expect(result).toEqual(new Date('2022-02-01T00:00:00.000Z'));
    });
  });

  describe('endOfDay', () => {
    it('should return the end of the day for the specified date', () => {
      const date = new Date('2022-01-01T00:00:00.000Z');

      const resultDateLocal = DateUtil.endOfDay(date);
      const resultDateUtc = DateUtil.timeZoneToUTC(
        resultDateLocal,
        TIMEZONE_UTC,
      );

      expect(resultDateUtc).toEqual(new Date('2022-01-01T23:59:59.999Z'));
    });

    it('should return the end of the current day if no date is specified', () => {
      const now = new Date();

      now.setHours(0, 0, 0, 0); // Start of the current day

      const result = DateUtil.endOfDay(new Date());

      expect(result).toEqual(
        new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          23,
          59,
          59,
          999,
        ),
      );
    });

    it('should handle date strings', () => {
      const date = '2022-01-01T00:00:00.000Z';

      const resultDateLocal = DateUtil.endOfDay(date);
      const resultDateUtc = DateUtil.timeZoneToUTC(
        resultDateLocal,
        TIMEZONE_UTC,
      );

      expect(resultDateUtc).toEqual(new Date('2022-01-01T23:59:59.999Z'));
    });

    it('should handle date numbers', () => {
      const date = new Date('2022-01-01T00:00:00.000Z').getTime();

      const resultDateLocal = DateUtil.endOfDay(date);
      const resultDateUtc = DateUtil.timeZoneToUTC(
        resultDateLocal,
        TIMEZONE_UTC,
      );

      expect(resultDateUtc).toEqual(new Date('2022-01-01T23:59:59.999Z'));
    });
  });

  describe('startOfDay', () => {
    it('should return the start of the day for the specified date', () => {
      const date = new Date('2022-01-01T12:34:56.000');

      const resultDateLocal = DateUtil.startOfDay(date);
      const resultDateUtc = DateUtil.timeZoneToUTC(
        resultDateLocal,
        TIMEZONE_UTC,
      );

      expect(resultDateUtc).toEqual(new Date('2022-01-01T00:00:00.000Z'));
    });

    it('should return the start of the current day if no date is specified', () => {
      const now = new Date();

      const result = DateUtil.startOfDay(new Date());

      expect(result).toEqual(
        new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0),
      );
    });

    it('should handle date strings', () => {
      const date = '2022-01-01T12:34:56.789Z';

      const resultDateLocal = DateUtil.startOfDay(date);
      const resultDateUtc = DateUtil.timeZoneToUTC(
        resultDateLocal,
        TIMEZONE_UTC,
      );

      expect(resultDateUtc).toEqual(new Date('2022-01-01T00:00:00.000Z'));
    });

    it('should handle date numbers', () => {
      const date = new Date('2022-01-01T12:34:56.789Z').getTime();

      const resultDateLocal = DateUtil.startOfDay(date);
      const resultDateUtc = DateUtil.timeZoneToUTC(
        resultDateLocal,
        TIMEZONE_UTC,
      );

      expect(resultDateUtc).toEqual(new Date('2022-01-01T00:00:00.000Z'));
    });
  });

  describe('isBetweenDay', () => {
    it('should return true if the current date is between the start and end dates', () => {
      const dateFrom = new Date('2022-01-01T00:00:00.000Z');
      const dateTo = new Date('2022-01-03T00:00:00.000Z');
      const curDate = new Date('2022-01-02T12:34:56.789Z');

      const result = DateUtil.isBetweenDay(dateFrom, dateTo, curDate);

      expect(result).toBe(true);
    });

    it('should return true if the current date is the same as the start or end date', () => {
      const dateFrom = new Date('2022-01-01T00:00:00.000Z');
      const dateTo = new Date('2022-01-03T00:00:00.000Z');
      const curDate = new Date('2022-01-01T00:00:00.000Z');

      const result = DateUtil.isBetweenDay(dateFrom, dateTo, curDate);

      expect(result).toBe(true);
    });

    it('should return false if the current date is before the start date or after the end date', () => {
      const dateFrom = new Date('2022-01-01T00:00:00.000Z');
      const dateTo = new Date('2022-01-03T00:00:00.000Z');
      const curDate = new Date('2021-12-31T23:59:59.999Z');

      const result = DateUtil.isBetweenDay(dateFrom, dateTo, curDate);

      expect(result).toBe(false);
    });

    it('should use the current date if no current date is specified', () => {
      const dateFrom = new Date('2022-01-01T00:00:00.000Z');
      const dateTo = new Date('2022-01-03T00:00:00.000Z');
      const curDate = new Date('2023-12-31T23:59:59.999Z');

      const result = DateUtil.isBetweenDay(dateFrom, dateTo, curDate);

      expect(result).toBe(false);
    });
  });

  describe('isSameDay', () => {
    it('should return true if the two dates are on the same day', () => {
      const dateLeft = new Date('2022-01-01T12:34:56.789Z');
      const dateRight = new Date('2022-01-01T00:00:00.000Z');

      const result = DateUtil.isSameDay(dateLeft, dateRight);

      expect(result).toBe(true);
    });

    it('should return false if the two dates are not on the same day', () => {
      const dateLeft = new Date('2022-01-01T12:34:56.789Z');
      const dateRight = new Date('2022-01-02T00:00:00.000Z');

      const result = DateUtil.isSameDay(dateLeft, dateRight);

      expect(result).toBe(false);
    });

    it('should return false if either date is invalid', () => {
      const dateLeft = new Date('2022-01-01T12:34:56.789Z');
      const dateRight = 'invalid date';

      const result = DateUtil.isSameDay(dateLeft, dateRight);

      expect(result).toBe(false);
    });

    it('should handle date strings', () => {
      const dateLeft = '2022-01-01T12:34:56.789Z';
      const dateRight = '2022-01-01T00:00:00.000Z';

      const result = DateUtil.isSameDay(dateLeft, dateRight);

      expect(result).toBe(true);
    });

    it('should handle date numbers', () => {
      const dateLeft = new Date('2022-01-01T12:34:56.789Z').getTime();
      const dateRight = new Date('2022-01-01T00:00:00.000Z').getTime();

      const result = DateUtil.isSameDay(dateLeft, dateRight);

      expect(result).toBe(true);
    });
  });

  describe('isSameOrBeforeDay', () => {
    it('should return true if the first date is the same as the second date', () => {
      const dateFrom = new Date('2022-01-01T00:00:00.000Z');
      const dateTo = new Date('2022-01-01T00:00:00.000Z');

      const result = DateUtil.isSameOrBeforeDay(dateFrom, dateTo);

      expect(result).toBe(true);
    });

    it('should return true if the first date is before the second date', () => {
      const dateFrom = new Date('2022-01-01T00:00:00.000Z');
      const dateTo = new Date('2022-01-02T00:00:00.000Z');

      const result = DateUtil.isSameOrBeforeDay(dateFrom, dateTo);

      expect(result).toBe(true);
    });

    it('should return false if the first date is after the second date', () => {
      const dateFrom = new Date('2022-01-02T00:00:00.000Z');
      const dateTo = new Date('2022-01-01T00:00:00.000Z');

      const result = DateUtil.isSameOrBeforeDay(dateFrom, dateTo);

      expect(result).toBe(false);
    });

    it('should handle date strings', () => {
      const dateFrom = '2022-01-01T00:00:00.000Z';
      const dateTo = '2022-01-01T00:00:00.000Z';

      const result = DateUtil.isSameOrBeforeDay(dateFrom, dateTo);

      expect(result).toBe(true);
    });

    it('should handle date numbers', () => {
      const dateFrom = new Date('2022-01-01T00:00:00.000Z').getTime();
      const dateTo = new Date('2022-01-01T00:00:00.000Z').getTime();

      const result = DateUtil.isSameOrBeforeDay(dateFrom, dateTo);

      expect(result).toBe(true);
    });
  });

  describe('parseISO', () => {
    it('should parse a valid ISO date string', () => {
      const date = '2022-01-01T00:00:00.000Z';

      const result = DateUtil.parseISO(date);

      expect(result).toEqual(new Date(date));
    });

    it('should return the same date if a date object is provided', () => {
      const date = new Date('2022-01-01T00:00:00.000Z');

      const result = DateUtil.parseISO(date);

      expect(result).toEqual(date);
    });

    it('should throw an error if an invalid date string is provided', () => {
      const date = 'invalid date';

      expect(() => DateUtil.parseISO(date)).toThrow('Invalid Date');
    });

    it('should throw an error if no date is provided', () => {
      expect(() => DateUtil.parseISO('1243124')).toThrow('Invalid Date');
    });
  });

  describe('parseStringToMs', () => {
    it('should parse a valid time 2 days/d to milliseconds', () => {
      const time = '2 days';

      const result = DateUtil.parseStringToMs(time);

      expect(result).toEqual(2 * 24 * 60 * 60 * 1000); // 2 days in milliseconds
    });

    it('should return 0 for an empty string', () => {
      const time = '';

      const result = DateUtil.parseStringToMs(time);

      expect(result).toEqual(0);
    });

    it('should throw an error for an invalid time string', () => {
      const time = 'invalid time';

      const result = DateUtil.parseStringToMs(time);

      expect(result).toEqual(0);
    });

    it('should parse a valid time 3h to milliseconds', () => {
      const time = '3h';

      const result = DateUtil.parseStringToMs(time);

      expect(result).toEqual(3 * 60 * 60 * 1000); // 3 hours in milliseconds
    });
  });

  describe('timeZoneToUTC', () => {
    it('should convert a date in a specific timezone to UTC', () => {
      const date = '2022-01-01T00:00:00.000';
      const tz = 'America/Los_Angeles'; // PST

      const result = DateUtil.timeZoneToUTC(date, tz);

      // The date is '2022-01-01T00:00:00.000' in PST, which is '2022-01-01T08:00:00.000Z' in UTC.
      expect(result).toEqual(new Date('2022-01-01T08:00:00.000Z'));
    });

    it('should throw an error if an invalid date is provided', () => {
      const date = 'invalid date';

      expect(() => DateUtil.timeZoneToUTC(date)).toThrow('Invalid Date');
    });

    it('should throw an error if an invalid timezone is provided', () => {
      const date = '2022-01-01T00:00:00.000';
      const tz = 'invalid timezone';

      expect(() => DateUtil.timeZoneToUTC(date, tz)).toThrow('Invalid Date');
    });
  });

  describe('toFormat', () => {
    it('should format a date to the default format', () => {
      const date = '2022-01-01T00:00:00.000Z';

      const result = DateUtil.toFormat(date);

      // Assuming the default format is 'yyyy-MM-dd'.
      expect(result).toEqual('2022-01-01');
    });

    it('should format a date to a specified format', () => {
      const date = '2022-01-01T00:00:00.000Z';
      const format = 'MM/dd/yyyy';

      const result = DateUtil.toFormat(date, format);

      expect(result).toEqual('01/01/2022');
    });

    it('should handle date objects', () => {
      const date = new Date('2022-01-01T00:00:00.000Z');

      const result = DateUtil.toFormat(date);

      // Assuming the default format is 'yyyy-MM-dd'.
      expect(result).toEqual('2022-01-01');
    });

    it('should throw an error if an invalid date is provided', () => {
      const date = 'invalid date';

      expect(() => DateUtil.toFormat(date)).toThrow('Invalid Date');
    });

    it('should throw an error if an invalid format is provided', () => {
      const date = '2022-01-01T00:00:00.000Z';
      const format = 'invalid format';

      expect(() => DateUtil.toFormat(date, format)).toThrow();
    });
  });

  describe('toFormatUTC', () => {
    it('should format a local date to the default format in UTC', () => {
      const date = '2022-01-01T00:00:00-0700';

      const result = DateUtil.toFormatUTC(date);

      expect(result).toEqual('2022-01-01');
    });

    it('should format a local date to a specified format in UTC', () => {
      const date = '2022-01-01T00:00:00-0700';
      const format = 'MM/dd/yyyy';

      const result = DateUtil.toFormatUTC(date, format);

      expect(result).toEqual('01/01/2022');
    });

    it('should format a local date to a specified format in UTC', () => {
      const date = '2022-01-01T00:00:00+0700';
      const format = 'MM/dd/yyyy';

      const result = DateUtil.toFormatUTC(date, format);

      expect(result).toEqual('12/31/2021');
    });

    it('should handle date objects', () => {
      const date = new Date('2022-01-01T00:00:00+0700');

      const result = DateUtil.toFormatUTC(date);

      expect(result).toEqual('2021-12-31');
    });

    it('should throw an error if an invalid date is provided', () => {
      const date = 'invalid date';

      expect(() => DateUtil.toFormatUTC(date)).toThrow('Invalid Date');
    });

    it('should throw an error if an invalid format is provided', () => {
      const date = '2022-01-01T00:00:00.000';
      const format = 'invalid format';

      expect(() => DateUtil.toFormatUTC(date, format)).toThrow();
    });
  });

  describe('toUnix', () => {
    it('should convert a valid ISO date string to Unix time', () => {
      const date = '2022-01-01T00:00:00.000Z';

      const result = DateUtil.toUnix(date);

      expect(result).toEqual(Math.floor(new Date(date).getTime() / 1000));
    });

    it('should convert a date object to Unix time', () => {
      const date = new Date('2022-01-01T00:00:00.000Z');

      const result = DateUtil.toUnix(date);

      expect(result).toEqual(Math.floor(date.getTime() / 1000));
    });

    it('should throw an error if an invalid date is provided', () => {
      const date = 'invalid date';

      expect(() => DateUtil.toUnix(date)).toThrow('Invalid Date');
    });

    it('should handle date numbers', () => {
      const date = new Date('2022-01-01T00:00:00.000Z').getTime();

      const result = DateUtil.toUnix(date);

      expect(result).toEqual(Math.floor(date / 1000));
    });
  });
});
