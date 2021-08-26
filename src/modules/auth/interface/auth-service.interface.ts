export interface IAuthService {
  forgotPassword(): void;
  resetPassword(): void;
  login(): void;
  logout(): void;
  refreshToken(): void;
}
