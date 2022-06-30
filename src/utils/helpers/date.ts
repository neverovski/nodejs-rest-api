import {
  addMilliseconds as fnsAddMilliseconds,
  getUnixTime as fnsGetUnixTime,
  isDate as fnsIsDate,
  isSameDay as fnsIsSameDay,
  parseISO as fnsParseISO,
} from 'date-fns';
import { format as fnsTzFormat, formatInTimeZone } from 'date-fns-tz';
import ms from 'ms';

import { FORMAT_DATE } from '../constants';

export const parseISO = (date: DateCtx) =>
  typeof date === 'string' ? fnsParseISO(date) : date;

export const isSameDay = (dateLeft?: DateCtx, dateRight?: DateCtx): boolean => {
  if (
    dateLeft &&
    fnsIsDate(new Date(dateLeft)) &&
    dateRight &&
    fnsIsDate(new Date(dateRight))
  ) {
    return fnsIsSameDay(parseISO(dateLeft), parseISO(dateRight));
  }

  return false;
};

export const toDate = (date: DateCtx) => parseISO(date);

export const toFormat = (date?: DateCtx, fmt = FORMAT_DATE, tz?: string) =>
  fnsTzFormat(parseISO(date || new Date()), fmt, {
    ...(tz && {
      timeZone: tz,
    }),
  });

export const toUTC = (date: DateCtx, fmt = FORMAT_DATE) =>
  formatInTimeZone(date, 'UTC', fmt);

export const toMs = (input: string): number => ms(input);

export const addMillisecondToDate = (date?: DateCtx, amount?: number): Date =>
  fnsAddMilliseconds(
    date && fnsIsDate(new Date(date)) ? parseISO(date) : new Date(),
    amount || 0,
  );

export const toUnix = (date?: DateCtx): number =>
  fnsGetUnixTime(
    date && fnsIsDate(new Date(date)) ? parseISO(date) : new Date(),
  );
