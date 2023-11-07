import { PlatformPayload } from '@common/types';

export interface IGoogleService {
  getPlatformPayload(token: string): Promise<PlatformPayload>;
}
