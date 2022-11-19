type JwtPayload = {
  email?: string;
  jti: string;
  role: string;
  sub: number;
  typ: string;
  userId: number;
};

type UserPayload = Pick<JwtPayload, 'email' | 'role' | 'userId'>;

type UserAgentCtx = {
  browser?: string;
  ip?: string | null;
  os?: string;
  userAgent?: string;
};

declare namespace Express {
  export interface Request {
    params: any;
    user: UserPayload;
    userAgent?: UserAgentCtx;
  }
}
