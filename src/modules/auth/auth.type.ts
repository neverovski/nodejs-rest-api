import { FullUser } from '@modules/user';

export enum AuthInject {
  AUTH_SERVICE = 'AuthService',
}

export type LoginRequest = Required<Pick<FullUser, 'email' | 'password'>>;
export type RefreshTokenRequest = { refreshToken: string };
export type LogoutRequest = { userId: FullUser['id'] };
export type ForgotPasswordRequest = Required<Pick<FullUser, 'email'>>;
export type ResetPasswordRequest = Required<Pick<FullUser, 'password'>> & {
  token: string;
};
