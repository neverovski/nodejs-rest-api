import type { DestinationStream } from 'pino';

import { LoggerType } from '@utils';

export type LoggerInitial = {
  env: string;
  name: string;
  stream?: DestinationStream;
};

export type LoggerCtx = {
  error?: Error | any;
  info?: string | any;
  message: string;
  type?: LoggerType;
};
