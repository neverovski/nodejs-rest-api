import {
  LoginRequest,
  RefreshTokenRequest,
  TokenResponse,
  LogoutRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from '../auth.type';

export interface IAuthService {
  forgotPassword(body: ForgotPasswordRequest): Promise<void>;
  login(body: LoginRequest, ctx: Context): Promise<TokenResponse>;
  logout(body: LogoutRequest): Promise<void>;
  refreshToken(body: RefreshTokenRequest, ctx: Context): Promise<TokenResponse>;
  resetPassword(body: ResetPasswordRequest): Promise<void>;
}
