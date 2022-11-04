import type { DestinationStream } from 'pino';

import { LoggerType } from '@utils';

export type LoggerInitial = {
  env: string;
  name: string;
  stream?: DestinationStream;
};

export type LoggerCtxInfo = {
  error?: Error | any;
  info?: string | any;
  message: string;
  type?: LoggerType;
};

export type LoggerCtxError = Required<
  Pick<LoggerCtxInfo, 'message' | 'error'>
> &
  Pick<LoggerCtxInfo, 'type'>;
