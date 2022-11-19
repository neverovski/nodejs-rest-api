import { PlatformPayload } from '@utils';

export interface IGitHubService {
  getProfile(token: string): Promise<PlatformPayload>;
}
