import { LoginRequest, RefreshTokenRequest, TokenResponse } from '../auth.type';

export interface IAuthService {
  forgotPassword(): void;
  resetPassword(): void;
  login(body: LoginRequest): Promise<TokenResponse>;
  logout(): void;
  refreshToken(body: RefreshTokenRequest): Promise<TokenResponse>;
}
