import { JwtTokenType } from '@common/types';

export interface IJwtConfig {
  accessToken: JwtTokenType;
  refreshToken: JwtTokenType;
  token: JwtTokenType;
}
