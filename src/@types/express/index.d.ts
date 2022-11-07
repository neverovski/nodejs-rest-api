type JwtPayload = {
  email?: string;
  role: string;
  sub: number;
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
