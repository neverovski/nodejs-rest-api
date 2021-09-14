import { isDate, addMilliseconds, getUnixTime } from 'date-fns';
import ms from 'ms';

export const convertToMS = (input: string): number => {
  return ms(input);
};

export const addMillisecondToDate = (
  input?: Date | number,
  amount?: number,
): Date => {
  const date = input && isDate(input) ? input : new Date();

  return addMilliseconds(date, amount || 0);
};

export const convertToUnixTime = (input?: Date | number): number => {
  const date = input && isDate(input) ? input : new Date();

  return getUnixTime(date);
};
