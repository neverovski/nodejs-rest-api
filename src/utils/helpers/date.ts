import {
  isDate,
  addMilliseconds,
  isSameDay as isSameDayFns,
  getUnixTime,
  format,
  parseISO,
} from 'date-fns';
import ms from 'ms';

import { FORMAT_DATE } from '../constants';

export const isSameDay = (
  dateLeft?: Date | number,
  dateRight?: Date | number,
): boolean => {
  if (dateLeft && dateRight) {
    return isSameDayFns(dateLeft, dateRight);
  }

  return false;
};

export const toDate = (date: string) => {
  return parseISO(date);
};

export const toFormat = (date: Date | number, formatString = FORMAT_DATE) => {
  return format(date, formatString);
};

export const toMs = (input: string): number => ms(input);

export const addMillisecondToDate = (
  date?: Date | number,
  amount?: number,
): Date => {
  return addMilliseconds(date && isDate(date) ? date : new Date(), amount || 0);
};

export const toUnix = (date?: Date | number): number => {
  return getUnixTime(date && isDate(date) ? date : new Date());
};
