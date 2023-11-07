type Id = number;
type Email = string;

type IdObject = { id: Id };

type DateInfo = {
  createdAt: Date;
  updatedAt: Date;
};

type CookieParam = {
  domain: string;
  expiresIn: string;
  maxAge?: number;
  rememberMe: boolean;
};

type TokePayload = {
  accessToken?: string;
  refreshToken?: string;
};

type PagePayload = {
  limit: number;
  offset: number;
  page: number;
};

type DateCtx = string | number | Date;

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
