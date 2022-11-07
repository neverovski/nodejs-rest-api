type JwtPayload = {
  email?: string;
  jti: string;
  role: string;
  sub: number;
  typ: string;
  userId: number;
};

type UserPayload = Pick<JwtPayload, 'email' | 'role' | 'userId'>;

type RequestCtx = {
  browser?: string;
  ip?: string;
  os?: string;
  userAgent?: string;
};

declare namespace Express {
  export interface Request {
    ctx: RequestCtx;
    params: any;
    user: UserPayload;
  }
}
