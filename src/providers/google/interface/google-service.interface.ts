import { PlatformProvider } from '@modules/platform';

export interface IGoogleService {
  getProfile(token: string): Promise<PlatformProvider>;
}
