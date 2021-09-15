import { Login, ResponseToken } from '../auth.type';

export interface IAuthService {
  forgotPassword(): void;
  resetPassword(): void;
  login(body: Login): Promise<ResponseToken>;
  logout(): void;
  refreshToken(): void;
}
