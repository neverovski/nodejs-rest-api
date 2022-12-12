import { PlatformPayload } from '@utils';

export interface IGoogleService {
  getProfile(token: string): Promise<PlatformPayload>;
}
