import { FindOneOptions } from 'typeorm';

export type OptionCtx<T> = Pick<
  FindOneOptions<T>,
  'where' | 'order' | 'relations'
>;

export interface IHttpException {
  message: string;
  status: number;
  code: string;
}

export enum TypeToken {
  BEARER = 'Bearer',
}

export enum HttpExceptionType {
  OK = 'OK',
  USER_CREATED = 'USER_CREATED',
  BAD_REQUEST = 'BAD_REQUEST',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  TOKEN_MALFORMED = 'TOKEN_MALFORMED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  UNPROCESSABLE_ENTITY = 'UNPROCESSABLE_ENTITY',
  ROUTE_NOT_FOUND = 'ROUTE_NOT_FOUND',
  SERVER_ERROR = 'SERVER_ERROR',
}
