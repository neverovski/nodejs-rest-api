import dateFns from 'date-fns';
import ms from 'ms';

export const convertToMS = (input: string): number => {
  return ms(input);
};

export const addMilliseconds = (
  input?: Date | number,
  amount?: number,
): Date => {
  const date = input && dateFns.isDate(input) ? input : new Date();

  return dateFns.addMilliseconds(date, amount || 0);
};
