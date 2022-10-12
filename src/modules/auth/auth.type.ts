import { FindManyOptions } from 'typeorm';

import { FullUser, UserPayload } from '@modules/user';
import { TokenType } from '@utils';

import { IRefreshToken } from './interface';

export enum AuthInject {
  AUTH_SERVICE = 'AuthService',
}

export enum TokenInject {
  TOKEN_REPOSITORY = 'TokenRepository',
  TOKEN_SERVICE = 'TokenService',
}

export type RefreshToken = IRefreshToken;
export type FullRefreshToken = Id & RefreshToken & DateInfo;

export type TokenPayload = {
  jti: string;
  sub: string;
  typ: string;
};

export type AccessTokenPayload = TokenPayload & UserPayload;
export type AccessTokenRequest = Pick<RefreshToken, 'userId'> & UserPayload;

export type RefreshTokenPayload = TokenPayload;

export type LoginRequest = Required<Pick<FullUser, 'email' | 'password'>>;
export type RefreshTokenRequest = { refreshToken: string };
export type LogoutRequest = { userId: FullUser['id'] };
export type ForgotPasswordRequest = Required<Pick<FullUser, 'email'>>;
export type ResetPasswordRequest = Required<Pick<FullUser, 'password'>> & {
  token: string;
};

export type TokenRequest = Pick<FullUser, 'id' | 'email'>;
export type TokenResponse = {
  accessToken: string;
  refreshToken: string;
  tokenType: TokenType;
};

export type RefreshTokenOption = Pick<
  FindManyOptions<FullRefreshToken>,
  'where' | 'relations'
>;
