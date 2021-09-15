import { FullUser } from '@modules/user';

import { IRefreshToken } from './interface';

export type RefreshToken = IRefreshToken;
export type FullRefreshToken = Id & RefreshToken & DateInfo;

export type TokenPayload = {
  jti: string;
  sub: string;
  typ: string;
};

export type AccessTokenPayload = Pick<FullUser, 'email'> & TokenPayload;
export type RefreshTokenPayload = TokenPayload;

export type Login = Required<Pick<FullUser, 'email' | 'password'>>;
export type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};
