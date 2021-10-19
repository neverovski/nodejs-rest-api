export interface IRefreshToken {
  browser?: string;
  expiredAt: Date;
  ip?: string;
  isRevoked?: boolean;
  jwtid: string;
  os?: string;
  userAgent?: string;
  userId: number;
}
