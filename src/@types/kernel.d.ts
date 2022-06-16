type Id = {
  id: number;
};

type DateInfo = {
  createdAt: Date;
  updatedAt: Date;
};

type DateCtx = string | number | Date;

type HttpExceptionType = {
  code: string;
  errors?: { [key: string]: string };
  message: string;
  status: number;
};

type Meta = {
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number;
  prevPage: number;
  totalItems: number;
  totalPages: number;
};

type Page = { count: number; limit: number; page: number };

type ResponseData<T> = {
  data: T[] | T;
  meta?: Meta;
};

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

type FilterCtx<T> = {
  filter: T;
};

type Order = 'ASC' | 'DESC';
