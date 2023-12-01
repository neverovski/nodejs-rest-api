import type { Job } from 'bull';

export type JobHandler<T = any> = (job: Job<T>) => Promise<void>;
