import { SocialNetwork } from '@common/enums';
import { OptionManyCtx } from '@common/types';

import { IPlatform } from './interface';

export type Platform = IPlatform;
export type FullPlatform = IdObject & Platform & DateInfo;

export type PlatformRequest = {
  platform: SocialNetwork;
  token: string;
};
export type PlatformOption = OptionManyCtx<FullPlatform, FullPlatform>;
