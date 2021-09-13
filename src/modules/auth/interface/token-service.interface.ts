import { RefreshToken } from '../auth.type';

export interface ITokenService {
  generateAccessToken(): string;
  generateRefreshToken(
    body: Omit<RefreshToken, 'jwtid' | 'expiredAt'>,
  ): Promise<string>;
}
