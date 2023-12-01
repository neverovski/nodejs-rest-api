import { PlatformPayload } from '@common/types';

export interface IAppleService {
  getPayload(token: string): Promise<PlatformPayload>;
}
