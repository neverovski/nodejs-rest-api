import type {
  DestinationStream,
  LoggerOptions as PinoLoggerOptions,
} from 'pino';

export type LoggerOptionOrStream = PinoLoggerOptions | DestinationStream;
export type LoggerOptionAndStream = {
  options: PinoLoggerOptions;
  stream: DestinationStream;
};
