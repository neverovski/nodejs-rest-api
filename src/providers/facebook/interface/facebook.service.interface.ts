import { PlatformPayload } from '@utils';

export interface IFacebookService {
  getProfile(token: string): Promise<PlatformPayload>;
}
