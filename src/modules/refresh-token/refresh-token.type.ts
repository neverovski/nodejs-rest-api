import { FindOption } from '@common/types';

import { IRefreshToken } from './interface';

export type RefreshToken = IRefreshToken;
export type FullRefreshToken = IdObject & RefreshToken & DateInfo;

export type RefreshTokenPayload = Pick<JwtPayload, 'jti' | 'sub' | 'typ'>;

export type RefreshTokenOption = FindOption<FullRefreshToken>;
