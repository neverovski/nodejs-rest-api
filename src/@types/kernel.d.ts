type Id = number;
type Email = string;
type Password = string;

type Token = string;
type Code = string;

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
  accessToken?: Token;
  refreshToken?: Token;
};

type PagePayload = {
  limit: number;
  offset: number;
  page: number;
};

type FlexibleDate = string | number | Date;

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
