import { PlatformPayload } from '@utils';

import { FullPlatform, PlatformOption } from '../platform.type';

export interface IPlatformRepository {
  create(body: PlatformPayload): Promise<{ userId: number }>;
  findOne(options: PlatformOption): Promise<FullPlatform | null>;
}
