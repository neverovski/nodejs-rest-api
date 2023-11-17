import { PlatformPayload } from '@common/types';

export interface IFacebookService {
  getPayload(token: string): Promise<PlatformPayload>;
}
