import { nanoid } from 'nanoid';

export const fullName = (firstName?: string, lastName?: string) => {
  return `${firstName || ''} ${lastName || ''}`.trim();
};

export const codeNumber = (min = 100000, max = 999999) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const uuid = () => nanoid();
