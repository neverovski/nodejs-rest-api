import { PlatformPayload } from '@common/types';

export interface IGitHubService {
  getPayload(token: string): Promise<PlatformPayload>;
}
