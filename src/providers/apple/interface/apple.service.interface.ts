import { PlatformPayload } from '@common/types';

export interface IAppleService {
  getPlatformPayload(token: string): Promise<PlatformPayload>;
}
