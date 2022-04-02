import {
  isDate,
  addMilliseconds,
  isSameDay as isSameDayFns,
  getUnixTime,
  parseISO,
} from 'date-fns';
import { format, utcToZonedTime } from 'date-fns-tz';
import ms from 'ms';

import { FORMAT_DATE } from '../constants';

export default (() => {
  const isSameDay = (
    dateLeft?: Date | number,
    dateRight?: Date | number,
  ): boolean => {
    if (dateLeft && dateRight) {
      return isSameDayFns(dateLeft, dateRight);
    }

    return false;
  };

  const toDate = (date: string) => {
    return parseISO(date);
  };

  const toFormat = (date: Date | number, fmt = FORMAT_DATE, tz?: string) => {
    if (tz) {
      return format(utcToZonedTime(date, tz), fmt, { timeZone: tz });
    }

    return format(date, fmt);
  };

  const toMs = (input: string): number => ms(input);

  const addMillisecondToDate = (
    date?: Date | number,
    amount?: number,
  ): Date => {
    return addMilliseconds(
      date && isDate(date) ? date : new Date(),
      amount || 0,
    );
  };

  const toUnix = (date?: Date | number): number => {
    return getUnixTime(date && isDate(date) ? date : new Date());
  };

  return { isSameDay, toDate, toFormat, toMs, addMillisecondToDate, toUnix };
})();
