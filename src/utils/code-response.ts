import { HttpExceptionType, IHttpException, HttpStatus } from './utility-types';

export const CodeResponse = {
  [HttpExceptionType.OK]: {
    status: HttpStatus.OK,
    code: HttpExceptionType.OK,
    message: 'Ok',
  },
  [HttpExceptionType.USER_CREATED]: {
    status: HttpStatus.OK,
    code: HttpExceptionType.USER_CREATED,
    message: 'User created successfully!',
  },
  [HttpExceptionType.BAD_REQUEST]: {
    status: HttpStatus.BadRequest,
    code: HttpExceptionType.BAD_REQUEST,
    message: 'Bad Request',
  },
  [HttpExceptionType.INVALID_CREDENTIALS]: {
    message: 'Invalid credentials',
    status: HttpStatus.BadRequest,
    code: HttpExceptionType.INVALID_CREDENTIALS,
  },
  [HttpExceptionType.TOKEN_EXPIRED]: {
    status: HttpStatus.Unauthorized,
    code: HttpExceptionType.TOKEN_EXPIRED,
    message: 'Token expired',
  },
  [HttpExceptionType.TOKEN_MALFORMED]: {
    status: HttpStatus.Unauthorized,
    code: HttpExceptionType.TOKEN_MALFORMED,
    message: 'Trying get data from token. Something wrong',
  },
  [HttpExceptionType.FORBIDDEN]: {
    status: HttpStatus.Forbidden,
    code: HttpExceptionType.FORBIDDEN,
    message: 'Forbidden',
  },
  [HttpExceptionType.NOT_FOUND]: {
    status: HttpStatus.NotFound,
    code: HttpExceptionType.NOT_FOUND,
    message: 'Not found',
  },
  [HttpExceptionType.ROUTE_NOT_FOUND]: {
    status: HttpStatus.NotFound,
    code: HttpExceptionType.ROUTE_NOT_FOUND,
    message: 'Route not found',
  },
  [HttpExceptionType.USER_ALREADY_TAKEN]: {
    message: 'This email or phone already taken, try use another',
    status: HttpStatus.Conflict,
    code: HttpExceptionType.USER_ALREADY_TAKEN,
  },
  [HttpExceptionType.UNPROCESSABLE_ENTITY]: {
    status: HttpStatus.UnprocessableEntity,
    code: HttpExceptionType.UNPROCESSABLE_ENTITY,
    message: 'Validation Failed',
  },
  [HttpExceptionType.SERVER_ERROR]: {
    status: HttpStatus.InternalServerError,
    code: HttpExceptionType.SERVER_ERROR,
    message: 'Server error occurred',
  },
} as Record<HttpExceptionType, IHttpException>;
