/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { nanoid } from 'nanoid';

export const capitalize = (s?: string): string => {
  if (typeof s !== 'string') {
    return '';
  }

  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const uuid = () => nanoid();

export const replace = (
  str: string,
  keys: { [key: string]: string | number },
  delimiter = ['{', '}'],
): string => {
  Object.keys(keys).forEach((key) => {
    if (delimiter && delimiter[0] && delimiter[1]) {
      str = str.replaceAll(
        `${delimiter[0]}${key}${delimiter[1]}`,
        `${keys[key] || ''}`,
      );
    }
  });

  return str;
};
