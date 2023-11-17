import type { FullUser } from '@modules/user';

import { CreatePlatform } from '../platform.type';

export interface IPlatformService {
  create(data: CreatePlatform): Promise<FullUser>;
}
