import type { JobOptions, RateLimiter } from 'bull';

import { TimeInMilliseconds } from '@common/enums';

export const DEFAULT_JOB_OPTIONS: JobOptions = {
  attempts: 15,
  backoff: {
    type: 'exponential',
    delay: TimeInMilliseconds.TIME_10_SECONDS,
  },
  removeOnComplete: true,
};

export const DEFAULT_LIMITER: RateLimiter = {
  max: 15,
  duration: TimeInMilliseconds.TIME_5_SECONDS,
};
