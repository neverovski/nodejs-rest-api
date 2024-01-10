import {
  AuthCtx,
  AuthForgotPasswordByEmail,
  AuthLogin,
  AuthLogout,
  AuthPlatform,
  AuthRefreshToken,
  AuthResetPasswordByEmail,
  AuthToken,
  AuthVerifyEmail,
} from '../../auth.type';

export interface IAuthService {
  forgotPasswordByEmail(data: AuthForgotPasswordByEmail): Promise<void>;
  login(data: AuthLogin, ctx?: AuthCtx): Promise<AuthToken>;
  logout(data: AuthLogout): Promise<void>;
  platform(data: AuthPlatform, ctx?: AuthCtx): Promise<AuthToken>;
  refreshToken(data: AuthRefreshToken, ctx?: AuthCtx): Promise<AuthToken>;
  resetPasswordByEmail(data: AuthResetPasswordByEmail): Promise<void>;
  sendVerifyCodeByEmail(data: Pick<AuthVerifyEmail, 'email'>): Promise<void>;
  verifyEmailByCode(data: AuthVerifyEmail): Promise<void>;
}
