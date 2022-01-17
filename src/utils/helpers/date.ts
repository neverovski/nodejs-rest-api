import {
  isDate,
  addMilliseconds,
  isSameDay as isSameDayFns,
  getUnixTime,
  format as formatDayFns,
} from 'date-fns';
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

  const format = (date: Date | number, formatString = FORMAT_DATE) => {
    return formatDayFns(date, formatString);
  };

  const convertToMS = (input: string): number => ms(input);

  const addMillisecondToDate = (
    input?: Date | number,
    amount?: number,
  ): Date => {
    return addMilliseconds(
      input && isDate(input) ? input : new Date(),
      amount || 0,
    );
  };

  const getUnixTimeOfDate = (input?: Date | number): number => {
    return getUnixTime(input && isDate(input) ? input : new Date());
  };

  return {
    isSameDay,
    convertToMS,
    addMillisecondToDate,
    getUnixTimeOfDate,
    format,
  };
})();
