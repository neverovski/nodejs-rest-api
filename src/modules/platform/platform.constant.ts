import { RelationParam } from '@common/types';

import { FullPlatform } from './platform.type';

export const PLATFORM_RELATION: RelationParam<FullPlatform> = {
  user: {
    profile: true,
  },
};
