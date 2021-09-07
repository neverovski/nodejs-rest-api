export interface IRefreshToken {
  userId: number;
  token: string;
  isRevoked: boolean;
  ip: string;
  os?: string;
  browser?: string;
  userAgent?: string;
  expiredAt: Date;
}
