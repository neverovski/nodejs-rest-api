type UserPayload = {
  email?: string;
  role: string;
  userId: number;
};

type JwtPayload = {
  jti: string;
  sub: number;
  typ: string;
} & UserPayload;

type PaginationCtx = {
  limit: number;
  offset: number;
  page: number;
};

type UserSessionCtx = {
  browser?: string;
  domain?: string;
  ip?: string | null;
  os?: string;
  userAgent?: string;
};

declare namespace Express {
  export interface Request {
    params: any;
    raw: any;
    user: UserPayload;
    userSession?: UserSessionCtx;
  }
}
