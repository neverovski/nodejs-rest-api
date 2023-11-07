import { PlatformPayload } from '@common/types';

export interface IGitHubService {
  getPlatformPayload(token: string): Promise<PlatformPayload>;
}
