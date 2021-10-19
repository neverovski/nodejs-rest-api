import { FullUser } from '@modules/user';
import { TokenType } from '@utils/index';

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

export type LoginRequest = Required<Pick<FullUser, 'email' | 'password'>>;
export type RefreshTokenRequest = { refreshToken: string };
export type LogoutRequest = { userId: FullUser['id'] };

export type TokenResponse = {
  type: TokenType;
  accessToken: string;
  refreshToken: string;
};
