type Id = {
  id: number;
};

type DateInfo = {
  createdAt: Date;
  updatedAt: Date;
};

type DateCtx = string | number | Date;

type ExceptionType = {
  code: string;
  errors?: { [key: string]: string };
  message: string;
  status: number;
};

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
