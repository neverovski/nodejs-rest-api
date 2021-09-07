type Id = {
  id: number;
};

type DateInfo = {
  createdAt: Date;
  updatedAt: Date;
};

type Meta = {
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number;
  prevPage: number;
  totalPages: number;
  totalItems: number;
};

type Page = { count: number; limit: number; page: number };
type ResponseData<T> = {
  data: T[] | T;
  meta?: Meta;
};
