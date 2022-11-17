import { FullUser } from '@modules/user';

export interface IRefreshToken {
  browser?: string | null;
  expiredAt: Date;
  ip?: string | null;
  isRevoked?: boolean;
  jti: string;
  os?: string | null;
  user?: FullUser;
  userAgent?: string | null;
  userId: number;
}
