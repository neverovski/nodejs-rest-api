import { PlatformName } from '@common/enums';
import { FindOption } from '@common/types';

import { IPlatform } from './interface';

export type Platform = IPlatform;
export type FullPlatform = IdObject & Platform & DateInfo;

export type CreatePlatform = {
  platform: PlatformName;
  token: string;
};

export type PlatformQuery = DeepPartial<FullPlatform>;
export type PlatformOption = FindOption<PlatformQuery>;
