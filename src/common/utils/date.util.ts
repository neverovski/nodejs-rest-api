import {
  addMilliseconds as fnsAddMilliseconds,
  addMonths as fnsAddMonths,
  endOfDay as fnsEndOfDay,
  format as fnsFormat,
  getUnixTime as fnsGetUnixTime,
  isAfter as fnsIsAfter,
  isBefore as fnsIsBefore,
  isEqual as fnsIsEqual,
  isSameDay as fnsIsSameDay,
  isValid as fnsIsValid,
  parseISO as fnsParseISO,
  startOfDay as fnsStartOfDay,
} from 'date-fns';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import ms from 'ms';

import { DEFAULT_FORMAT_DATE, TIMEZONE_UTC } from '@common/constants';

//TODO: should be work only with UTC time
export class DateUtil {
  static addMillisecondToDate(date: FlexibleDate, amount?: number): Date {
    const dateISO = this.parseISO(date);

    return fnsAddMilliseconds(dateISO, amount || 0);
  }

  static addMonths(date: FlexibleDate, amount?: number): Date {
    const dateISO = this.parseISO(date);

    return fnsAddMonths(dateISO, amount || 0);
  }

  static endOfDay(date: FlexibleDate) {
    const dateISO = this.parseISO(date);

    return fnsEndOfDay(dateISO);
  }

  static isBetweenDay(
    dateFrom: FlexibleDate,
    dateTo: FlexibleDate,
    date: FlexibleDate,
  ) {
    const dateStartUtc = this.timeZoneToUTC(this.startOfDay(dateFrom));
    const dateEndUtc = this.timeZoneToUTC(this.endOfDay(dateTo));
    const dateISOUtc = this.parseISO(date);

    return (
      (fnsIsEqual(dateStartUtc, dateISOUtc) ||
        fnsIsBefore(dateStartUtc, dateISOUtc)) &&
      (fnsIsEqual(dateEndUtc, dateISOUtc) || fnsIsAfter(dateEndUtc, dateISOUtc))
    );
  }

  static isSameDay(dateLeft: FlexibleDate, dateRight: FlexibleDate): boolean {
    if (!this.isValid(dateLeft) || !this.isValid(dateRight)) {
      return false;
    }

    return fnsIsSameDay(this.parseISO(dateLeft), this.parseISO(dateRight));
  }

  static isSameOrBeforeDay(dateFrom: FlexibleDate, dateTo: FlexibleDate) {
    const dateStartFrom = this.startOfDay(dateFrom);
    const dateStartTo = this.startOfDay(dateTo);

    return (
      fnsIsEqual(dateStartFrom, dateStartTo) ||
      fnsIsBefore(dateStartFrom, dateStartTo)
    );
  }

  static parseISO(date: FlexibleDate) {
    if (!date || !this.isValid(date)) {
      throw new Error('Invalid Date');
    }

    return typeof date === 'string' ? fnsParseISO(date) : date;
  }

  static parseStringToMs(str: string): number {
    if (!str) {
      return 0;
    }

    return ms(str) || 0;
  }

  static startOfDay(date: FlexibleDate) {
    const dateISO = this.parseISO(date);

    return fnsStartOfDay(dateISO);
  }

  static timeZoneToUTC(date: FlexibleDate, tz = TIMEZONE_UTC) {
    try {
      const dateUtc = zonedTimeToUtc(date, tz);

      if (!this.isValid(dateUtc)) {
        throw new Error();
      }

      return dateUtc;
    } catch {
      throw new Error('Invalid Date');
    }
  }

  static toFormat(date: FlexibleDate, format = DEFAULT_FORMAT_DATE) {
    const dateISO = this.parseISO(date);

    return fnsFormat(dateISO, format);
  }

  static toFormatUTC(localDate: FlexibleDate, format = DEFAULT_FORMAT_DATE) {
    const dateISO = this.parseISO(localDate);
    const date = utcToZonedTime(dateISO, TIMEZONE_UTC);

    return fnsFormat(date, format);
  }

  static toUnix(date: FlexibleDate): number {
    const dateISO = this.parseISO(date);

    return fnsGetUnixTime(dateISO);
  }

  private static isValid(date?: FlexibleDate) {
    try {
      return fnsIsValid(typeof date === 'string' ? Date.parse(date) : date);
    } catch {
      throw new Error('Invalid Date');
    }
  }
}
