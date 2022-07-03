import { PlatformProvider } from '@modules/platform';

export interface IFacebookService {
  getProfile(token: string): Promise<PlatformProvider>;
}
