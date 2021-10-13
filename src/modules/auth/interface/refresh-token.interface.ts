export interface IRefreshToken {
  userId: number;
  jwtid: string;
  isRevoked?: boolean;
  ip?: string;
  os?: string;
  browser?: string;
  userAgent?: string;
  expiredAt: Date;
}
