import { HttpExceptionType, IHttpException } from './utility-types';

export const CodeResponse = {
  [HttpExceptionType.OK]: {
    status: 200,
    code: HttpExceptionType.OK,
    message: 'Ok',
  },
  [HttpExceptionType.USER_CREATED]: {
    status: 200,
    code: HttpExceptionType.USER_CREATED,
    message: 'User created successfully!',
  },
  [HttpExceptionType.BAD_REQUEST]: {
    status: 400,
    code: HttpExceptionType.BAD_REQUEST,
    message: 'Bad Request',
  },
  [HttpExceptionType.TOKEN_EXPIRED]: {
    status: 401,
    code: HttpExceptionType.TOKEN_EXPIRED,
    message: 'Token expired',
  },
  [HttpExceptionType.TOKEN_MALFORMED]: {
    status: 401,
    code: HttpExceptionType.TOKEN_MALFORMED,
    message: 'Trying get data from token. Something wrong',
  },
  [HttpExceptionType.FORBIDDEN]: {
    status: 403,
    code: HttpExceptionType.FORBIDDEN,
    message: 'Forbidden',
  },
  [HttpExceptionType.NOT_FOUND]: {
    status: 404,
    code: HttpExceptionType.NOT_FOUND,
    message: 'Not found',
  },
  [HttpExceptionType.ROUTE_NOT_FOUND]: {
    status: 404,
    code: HttpExceptionType.ROUTE_NOT_FOUND,
    message: 'Route not found',
  },
  [HttpExceptionType.UNPROCESSABLE_ENTITY]: {
    status: 422,
    code: HttpExceptionType.UNPROCESSABLE_ENTITY,
    message: 'Validation Failed',
  },
  [HttpExceptionType.SERVER_ERROR]: {
    status: 500,
    code: HttpExceptionType.SERVER_ERROR,
    message: 'Server error occurred',
  },
} as Record<HttpExceptionType, IHttpException>;
