import Bull from 'bull';

import { DEFAULT_JOB_OPTIONS, DEFAULT_LIMITER } from '@common/constants';
import { QueueUtil } from '@common/utils/queue.util';
import { IRedisConfig } from '@config';

jest.mock('bull');

describe('QueueUtil', () => {
  const NAME_QUEUE = 'test';
  const redisConfig: IRedisConfig = {
    host: 'localhost',
    port: 6379,
    password: 'password',
    queuePrefix: 'prefix',
  };

  it('should create a new Bull instance with the correct options', () => {
    const redisOptions = {
      host: redisConfig.host,
      port: redisConfig.port,
      password: redisConfig.password,
    };

    QueueUtil.connect(NAME_QUEUE, redisConfig);

    expect(Bull).toHaveBeenCalledWith(NAME_QUEUE, {
      redis: redisOptions,
      prefix: redisConfig.queuePrefix,
      limiter: DEFAULT_LIMITER,
      defaultJobOptions: DEFAULT_JOB_OPTIONS,
    });
  });

  it('should throw an error if name is not provided', () => {
    expect(() => QueueUtil.connect('', redisConfig)).toThrow(
      'name is required',
    );
  });

  it('should throw an error if redisConfig.host is not provided', () => {
    const invalidRedisConfig = { ...redisConfig, host: '' };

    expect(() => QueueUtil.connect(NAME_QUEUE, invalidRedisConfig)).toThrow(
      'redisConfig.host is required',
    );
  });

  it('should throw an error if redisConfig.port is not provided', () => {
    const invalidRedisConfig = { ...redisConfig, port: 0 };

    expect(() => QueueUtil.connect(NAME_QUEUE, invalidRedisConfig)).toThrow(
      'redisConfig.port is required',
    );
  });
});
