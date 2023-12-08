import type { Logger } from 'pino';

import { ILoggerService } from '@providers/logger';

export const loggerMock: ILoggerService = {
  pino: jest.mock('pino') as unknown as Logger,
  debug: jest.fn(),
  error: jest.fn(),
  log: jest.fn(),
  verbose: jest.fn(),
  warn: jest.fn(),
};
