type JwtPayload = {
  email?: string;
  role: string;
  sub: number;
  userId: number;
};

type UserPayload = Pick<JwtPayload, 'email' | 'role' | 'userId'>;

type Context = {
  browser?: string;
  ip?: string;
  os?: string;
  userAgent?: string;
};

declare namespace Express {
  export interface Request {
    ctx: Context;
    params: any;
    user: UserPayload;
  }
}
