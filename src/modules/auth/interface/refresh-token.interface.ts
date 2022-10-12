import { FullUser } from '@modules/user';

export interface IRefreshToken {
  browser?: string;
  expiredAt: Date;
  ip?: string;
  isRevoked?: boolean;
  jti: string;
  os?: string;
  user?: FullUser;
  userAgent?: string;
  userId: number;
}
