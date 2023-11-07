import { UniqueOptions } from '@common/types';

export const UQ_USER_EMAIL: UniqueOptions = {
  name: 'UQ_USER_EMAIL',
  columnNames: ['email'],
};

export const UQ_PLATFORM: UniqueOptions = {
  name: 'UQ_PLATFORM',
  columnNames: ['ssid', 'name'],
};
