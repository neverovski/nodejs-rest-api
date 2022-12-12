import { LoggerType } from '@utils';

export type LoggerInitial = {
  env: string;
  name: string;
  transport: { options: any; target: string };
};

export type LoggerCtx = {
  error?: Error | any;
  info?: string | any;
  message: string;
  type?: LoggerType;
};
