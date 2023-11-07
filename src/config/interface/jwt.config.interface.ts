import { JwtType } from '@common/types';

export interface IJwtConfig {
  accessToken: JwtType;
  refreshToken: JwtType;
  token: JwtType;
}
