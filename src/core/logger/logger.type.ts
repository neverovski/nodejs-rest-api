import type { DestinationStream } from 'pino';

export type LoggerInitial = {
  env: string;
  name: string;
  stream?: DestinationStream;
};
