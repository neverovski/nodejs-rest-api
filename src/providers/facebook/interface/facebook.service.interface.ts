import { PlatformPayload } from '@common/types';

export interface IFacebookService {
  getPlatformPayload(token: string): Promise<PlatformPayload>;
}
