import { PlatformProvider } from '@modules/platform';

export interface IGitHubService {
  getProfile(token: string): Promise<PlatformProvider>;
}
