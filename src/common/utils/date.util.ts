import {
  addMilliseconds as fnsAddMilliseconds,
  addMonths as fnsAddMonths,
  endOfDay as fnsEndOfDay,
  format as fnsFormat,
  formatISO as fnsFormatISO,
  getUnixTime as fnsGetUnixTime,
  isAfter as fnsIsAfter,
  isBefore as fnsIsBefore,
  isEqual as fnsIsEqual,
  isSameDay as fnsIsSameDay,
  isValid as fnsIsValid,
  parseISO as fnsParseISO,
  startOfDay as fnsStartOfDay,
} from 'date-fns';
import ms from 'ms';

import { DEFAULT_FORMAT_DATE } from '@common/constants';

export class DateUtil {
  static addMillisecondToDate(date?: DateCtx, amount?: number): Date {
    return fnsAddMilliseconds(DateUtil.transformDateToISO(date), amount || 0);
  }

  static addMonths(date?: DateCtx, amount?: number): Date {
    return fnsAddMonths(DateUtil.transformDateToISO(date), amount || 0);
  }

  static endOfDay(date?: DateCtx | null) {
    date = DateUtil.transformDateToISO(date || new Date());

    return fnsEndOfDay(date);
  }

  static formatISO(date?: DateCtx) {
    date = (DateUtil.isValid(date) ? date : new Date()) as DateCtx;

    return fnsFormatISO(DateUtil.parseISO(date));
  }

  static isBetweenDay(
    from: DateCtx,
    to?: DateCtx | null,
    date?: DateCtx | null,
  ) {
    from = DateUtil.startOfDay(from);
    to = DateUtil.endOfDay(to);
    date = DateUtil.transformDateToISO(date || new Date());

    return (
      (fnsIsEqual(from, date) || fnsIsBefore(from, date)) &&
      (fnsIsEqual(to, date) || fnsIsAfter(to, date))
    );
  }

  static isSameDay(dateLeft?: DateCtx, dateRight?: DateCtx): boolean {
    if (DateUtil.isValid(dateLeft) && DateUtil.isValid(dateRight)) {
      return fnsIsSameDay(
        DateUtil.parseISO(dateLeft as DateCtx),
        DateUtil.parseISO(dateRight as DateCtx),
      );
    }

    return false;
  }

  static isSameOrBeforeDay(from?: DateCtx | null, to?: DateCtx | null) {
    from = DateUtil.startOfDay(from || new Date());
    to = DateUtil.startOfDay(to || new Date());

    return fnsIsEqual(from, to) || fnsIsBefore(from, to);
  }

  static isValid(date?: DateCtx) {
    return fnsIsValid(typeof date === 'string' ? Date.parse(date) : date);
  }

  static parseISO(date: DateCtx) {
    return typeof date === 'string' ? fnsParseISO(date) : date;
  }

  static startOfDay(date?: DateCtx | null) {
    date = DateUtil.transformDateToISO(date || new Date());

    return fnsStartOfDay(date);
  }

  static toDate(date: DateCtx) {
    return DateUtil.transformDateToISO(date);
  }

  // FIXME: https://github.com/date-fns/date-fns/issues/2151
  static toFormat(date?: DateCtx, format = DEFAULT_FORMAT_DATE) {
    return fnsFormat(DateUtil.transformDateToISO(date), format);
  }

  static toMs(input: string): number {
    return ms(input);
  }

  static toUnix(date?: DateCtx): number {
    return fnsGetUnixTime(DateUtil.transformDateToISO(date));
  }

  static transformDateToISO(date?: DateCtx) {
    date = (DateUtil.isValid(date) ? date : new Date()) as DateCtx;

    return DateUtil.parseISO(date);
  }
}
