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

export type JWTPayload = {
  sub: number;
  email: string;
  role: string;
};

export enum TokenType {
  BEARER = 'Bearer',
}

export enum HttpExceptionType {
  OK = 'OK',
  USER_CREATED = 'USER_CREATED',
  BAD_REQUEST = 'BAD_REQUEST',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  TOKEN_MALFORMED = 'TOKEN_MALFORMED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  USER_ALREADY_TAKEN = 'USER_ALREADY_TAKEN',
  UNPROCESSABLE_ENTITY = 'UNPROCESSABLE_ENTITY',
  ROUTE_NOT_FOUND = 'ROUTE_NOT_FOUND',
  SERVER_ERROR = 'SERVER_ERROR',
}

export enum HttpStatus {
  OK = 200,
  Created = 201,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  UnprocessableEntity = 422,
  InternalServerError = 500,
}
