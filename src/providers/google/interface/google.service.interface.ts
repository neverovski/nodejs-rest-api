import { PlatformPayload } from '@common/types';

export interface IGoogleService {
  getPayload(token: string): Promise<PlatformPayload>;
}
