import { FindManyOptions } from 'typeorm';

import { FullUser, UserPayload } from '@modules/user';
import { TokenType } from '@utils';

import { IRefreshToken } from './interface';

export enum TokenInject {
  TOKEN_REPOSITORY = 'TokenRepository',
  TOKEN_SERVICE = 'TokenService',
}

export type RefreshToken = IRefreshToken;
export type FullRefreshToken = Id & RefreshToken & DateInfo;

export type AccessTokenRequest = Pick<RefreshToken, 'userId'> & UserPayload;
export type RefreshTokenPayload = Pick<JwtPayload, 'jti' | 'sub' | 'typ'>;

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
