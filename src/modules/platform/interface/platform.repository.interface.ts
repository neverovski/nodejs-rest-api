import { PlatformPayload } from '@common/types';
import type { FullUser } from '@modules/user';

import { FullPlatform, PlatformOption } from '../platform.type';

export interface IPlatformRepository {
  createPlatformAndUser(entity: PlatformPayload): Promise<FullUser>;
  findOne(options: PlatformOption): Promise<FullPlatform | null>;
}
