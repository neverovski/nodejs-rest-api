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
};

type TokePayload = {
  accessToken?: string;
  refreshToken?: string;
};

type DateCtx = string | number | Date;

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
