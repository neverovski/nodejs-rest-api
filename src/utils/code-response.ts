export enum HttpException {
  BAD_REQUEST = 'BAD_REQUEST',
  DB_ERROR = 'DB_ERROR',
  DELETE_ERROR = 'DELETE_ERROR',
  EMAIL_ALREADY_TAKEN = 'EMAIL_ALREADY_TAKEN',
  EMPTY_BODY = 'EMPTY_BODY',
  EXTERNAL = 'EXTERNAL',
  FORBIDDEN = 'FORBIDDEN',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  NOT_FOUND = 'NOT_FOUND',
  OK = 'OK',
  REFRESH_TOKEN_EXPIRED = 'REFRESH_TOKEN_EXPIRED',
  REFRESH_TOKEN_VERIFY = 'REFRESH_TOKEN_VERIFY',
  SERVER_ERROR = 'SERVER_ERROR',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  TOKEN_MALFORMED = 'TOKEN_MALFORMED',
  TOKEN_NOT_PROVIDED = 'TOKEN_NOT_PROVIDED',
  TOKEN_VERIFY = 'TOKEN_VERIFY',
  UNPROCESSABLE_ENTITY = 'UNPROCESSABLE_ENTITY',
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

export const CodeResponse = {
  [HttpException.OK]: {
    code: HttpException.OK,
    message: `message.exception.${HttpException.OK}`,
    status: HttpStatus.OK,
  },
  [HttpException.BAD_REQUEST]: {
    code: HttpException.BAD_REQUEST,
    message: `message.exception.${HttpException.BAD_REQUEST}`,
    status: HttpStatus.BadRequest,
  },
  [HttpException.EMPTY_BODY]: {
    code: HttpException.EMPTY_BODY,
    message: `message.exception.${HttpException.EMPTY_BODY}`,
    status: HttpStatus.BadRequest,
  },
  [HttpException.INVALID_CREDENTIALS]: {
    code: HttpException.INVALID_CREDENTIALS,
    message: `message.exception.${HttpException.INVALID_CREDENTIALS}`,
    status: HttpStatus.BadRequest,
  },
  [HttpException.TOKEN_NOT_PROVIDED]: {
    code: HttpException.TOKEN_NOT_PROVIDED,
    message: `message.exception.${HttpException.TOKEN_NOT_PROVIDED}`,
    status: HttpStatus.Unauthorized,
  },
  [HttpException.TOKEN_EXPIRED]: {
    code: HttpException.TOKEN_EXPIRED,
    message: `message.exception.${HttpException.TOKEN_EXPIRED}`,
    status: HttpStatus.Unauthorized,
  },
  [HttpException.REFRESH_TOKEN_EXPIRED]: {
    code: HttpException.REFRESH_TOKEN_EXPIRED,
    message: `message.exception.${HttpException.REFRESH_TOKEN_EXPIRED}`,
    status: HttpStatus.Unauthorized,
  },
  [HttpException.TOKEN_MALFORMED]: {
    code: HttpException.TOKEN_MALFORMED,
    message: `message.exception.${HttpException.TOKEN_MALFORMED}`,
    status: HttpStatus.Unauthorized,
  },
  [HttpException.TOKEN_VERIFY]: {
    code: HttpException.TOKEN_VERIFY,
    message: `message.exception.${HttpException.TOKEN_VERIFY}`,
    status: HttpStatus.Unauthorized,
  },
  [HttpException.REFRESH_TOKEN_VERIFY]: {
    code: HttpException.REFRESH_TOKEN_VERIFY,
    message: `message.exception.${HttpException.REFRESH_TOKEN_VERIFY}`,
    status: HttpStatus.Unauthorized,
  },
  [HttpException.FORBIDDEN]: {
    code: HttpException.FORBIDDEN,
    message: `message.exception.${HttpException.FORBIDDEN}`,
    status: HttpStatus.Forbidden,
  },
  [HttpException.NOT_FOUND]: {
    code: HttpException.NOT_FOUND,
    message: `message.exception.${HttpException.NOT_FOUND}`,
    status: HttpStatus.NotFound,
  },
  [HttpException.EMAIL_ALREADY_TAKEN]: {
    code: HttpException.EMAIL_ALREADY_TAKEN,
    message: `message.exception.${HttpException.EMAIL_ALREADY_TAKEN}`,
    status: HttpStatus.Conflict,
  },
  [HttpException.UNPROCESSABLE_ENTITY]: {
    code: HttpException.UNPROCESSABLE_ENTITY,
    message: `message.exception.${HttpException.UNPROCESSABLE_ENTITY}`,
    status: HttpStatus.UnprocessableEntity,
  },
  [HttpException.EXTERNAL]: {
    code: HttpException.EXTERNAL,
    message: `message.exception.${HttpException.EXTERNAL}`,
    status: HttpStatus.InternalServerError,
  },
  [HttpException.SERVER_ERROR]: {
    code: HttpException.SERVER_ERROR,
    message: `message.exception.${HttpException.SERVER_ERROR}`,
    status: HttpStatus.InternalServerError,
  },
  [HttpException.DB_ERROR]: {
    code: HttpException.DB_ERROR,
    message: `message.exception.${HttpException.DB_ERROR}`,
    status: HttpStatus.InternalServerError,
  },
  [HttpException.DELETE_ERROR]: {
    code: HttpException.DELETE_ERROR,
    message: `message.exception.${HttpException.DELETE_ERROR}`,
    status: HttpStatus.BadRequest,
  },
} as Record<HttpException, HttpExceptionType>;
