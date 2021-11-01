import { isDate, addMilliseconds, getUnixTime } from 'date-fns';
import ms from 'ms';

export const convertToMS = (input: string): number => {
  return ms(input);
};

export const addMillisecondToDate = (
  input?: Date | number,
  amount?: number,
): Date => {
  return addMilliseconds(
    input && isDate(input) ? input : new Date(),
    amount || 0,
  );
};

export const getUnixTimeOfDate = (input?: Date | number): number => {
  return getUnixTime(input && isDate(input) ? input : new Date());
};
