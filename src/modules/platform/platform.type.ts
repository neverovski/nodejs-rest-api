import { FindManyOptions } from 'typeorm';

import { FullUser } from '@modules/user';
import { SocialNetwork } from '@utils';

import { IPlatform } from './interface';

export enum PlatformInject {
  PLATFORM_REPOSITORY = 'PlatformRepository',
  PLATFORM_SERVICE = 'PlatformService',
}

export type Platform = IPlatform;
export type FullPlatform = Id & Platform & DateInfo;

export type PlatformPayload = Partial<Pick<FullUser, 'email'>> &
  DeepPartial<Pick<FullUser, 'profile'>>;

export type PlatformProvider = Omit<Platform, 'userId' | 'user'> &
  PlatformPayload;

export type PlatformRequest = {
  platform: SocialNetwork;
  token: string;
};

export type PlatformOption = Pick<
  FindManyOptions<FullPlatform>,
  'where' | 'relations'
>;
