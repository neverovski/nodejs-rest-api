import { PlatformPayload } from '@utils';

export interface IAppleService {
  getProfile(token: string): Promise<PlatformPayload>;
}
