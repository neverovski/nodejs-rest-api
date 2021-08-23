export interface IHttpException {
  message: string;
  status: number;
  code: string;
}

export enum HttpExceptionType {
  OK = 'OK',
  BAD_REQUEST = 'BAD_REQUEST',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  ROUTE_NOT_FOUND = 'ROUTE_NOT_FOUND',
  SERVER_ERROR = 'SERVER_ERROR',
}
