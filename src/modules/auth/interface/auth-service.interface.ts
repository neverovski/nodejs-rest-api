import {
  LoginRequest,
  RefreshTokenRequest,
  TokenResponse,
  LogoutRequest,
} from '../auth.type';

export interface IAuthService {
  forgotPassword(): void;
  login(body: LoginRequest): Promise<TokenResponse>;
  logout(body: LogoutRequest): Promise<void>;
  refreshToken(body: RefreshTokenRequest): Promise<TokenResponse>;
  resetPassword(): void;
}
