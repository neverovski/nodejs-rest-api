import type { FullUser } from '@modules/user';

import { PlatformRequest } from '../platform.type';

export interface IPlatformService {
  create(body: PlatformRequest): Promise<FullUser>;
}
