import { FullUser } from '@modules/user';

import { IPlatform } from './interface';

export enum PlatformInject {
  PLATFORM_REPOSITORY = 'PlatformRepository',
  PLATFORM_SERVICE = 'PlatformService',
}

export enum PlatformNetwork {
  FACEBOOK = 'facebook',
}

export type Platform = IPlatform;
export type FullPlatform = Id & Platform & DateInfo;

export type PlatformPayload = Partial<Pick<FullUser, 'email'>> &
  DeepPartial<Pick<FullUser, 'profile'>>;

export type PlatformProvider = Omit<Platform, 'userId' | 'user'> &
  PlatformPayload;

export type PlatformRequest = {
  platform: PlatformNetwork;
  token: string;
};
