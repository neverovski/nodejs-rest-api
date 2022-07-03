import { PlatformProvider } from '@modules/platform';

export interface IAppleService {
  getProfile(token: string): Promise<PlatformProvider>;
}
