import { HttpExceptionType, IHttpException } from './utility-types';

export const CodeResponse = {
  [HttpExceptionType.OK]: {
    status: 200,
    code: 'OK',
    message: 'Ok',
  },
  [HttpExceptionType.BAD_REQUEST]: {
    status: 400,
    code: 'BAD_REQUEST',
    message: 'Bad Request',
  },
  [HttpExceptionType.TOKEN_EXPIRED]: {
    status: 401,
    code: 'TOKEN_EXPIRED',
    message: 'Token expired',
  },
  [HttpExceptionType.FORBIDDEN]: {
    status: 403,
    code: 'FORBIDDEN',
    message: 'Forbidden',
  },
  [HttpExceptionType.NOT_FOUND]: {
    status: 404,
    code: 'NOT_FOUND',
    message: 'Not found',
  },
  [HttpExceptionType.ROUTE_NOT_FOUND]: {
    status: 404,
    code: 'ROUTE_NOT_FOUND',
    message: 'Route not found',
  },
  [HttpExceptionType.SERVER_ERROR]: {
    status: 500,
    code: 'SERVER_ERROR',
    message: 'Server error occurred',
  },
} as Record<HttpExceptionType, IHttpException>;
