type UserContext = {
  email: string;
  role: string;
  userId?: number;
};

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
    user: UserContext;
  }
}
