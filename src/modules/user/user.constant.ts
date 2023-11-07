import { RelationParam } from '@common/types';

import { FullUser } from './user.type';

export const USER_RELATION: RelationParam<FullUser> = {
  profile: true,
};
