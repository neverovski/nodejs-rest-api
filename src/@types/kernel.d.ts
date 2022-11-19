type Id = {
  id: number;
};

type Email = string;

type DateInfo = {
  createdAt: Date;
  updatedAt: Date;
};

type DateCtx = string | number | Date;

type ExceptionOption = {
  code: string;
  errors?: { [key: string]: string };
  message: string;
  name?: string;
  status: number;
};

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
