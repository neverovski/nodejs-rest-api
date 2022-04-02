export interface IHttpException {
  code: string;
  message: string;
  status: number;
}

export enum HttpExceptionType {
  BAD_REQUEST = 'BAD_REQUEST',
  EMAIL_ALREADY_TAKEN = 'EMAIL_ALREADY_TAKEN',
  EMPTY_BODY = 'EMPTY_BODY',
  FORBIDDEN = 'FORBIDDEN',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  NOT_FOUND = 'NOT_FOUND',
  OK = 'OK',
  PASSWORD_RESET_SENT_EMAIL = 'PASSWORD_RESET_SENT_EMAIL',
  PASSWORD_RESET_SUCCESSFULLY = 'PASSWORD_RESET_SUCCESSFULLY',
  REFRESH_TOKEN_EXPIRED = 'SESSION_EXPIRED',
  REFRESH_TOKEN_VERIFY = 'BAD_REFRESH_TOKEN',
  ROUTE_NOT_FOUND = 'ROUTE_NOT_FOUND',
  SERVER_ERROR = 'SERVER_ERROR',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  TOKEN_MALFORMED = 'TOKEN_MALFORMED',
  TOKEN_NOT_PROVIDED = 'TOKEN_NOT_PROVIDE',
  TOKEN_VERIFY = 'TOKEN_VERIFY',
  UNPROCESSABLE_ENTITY = 'UNPROCESSABLE_ENTITY',
  USER_CREATED = 'USER_CREATED',
  USER_UPDATE = 'USER_UPDATE',
  WRONG_EMAIL_CONFIRM_TOKEN = 'WRONG_EMAIL_CONFIRM_TOKEN',
  WRONG_RESET_PASSWORD_TOKEN = 'WRONG_RESET_PASSWORD_TOKEN',
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
  [HttpExceptionType.OK]: {
    status: HttpStatus.OK,
    code: HttpExceptionType.OK,
    message: 'Ok',
  },
  [HttpExceptionType.PASSWORD_RESET_SENT_EMAIL]: {
    message: 'Password reset code sent to email',
    status: HttpStatus.OK,
    code: HttpExceptionType.PASSWORD_RESET_SENT_EMAIL,
  },
  [HttpExceptionType.PASSWORD_RESET_SUCCESSFULLY]: {
    message: 'Password reset successfully',
    status: HttpStatus.OK,
    code: HttpExceptionType.PASSWORD_RESET_SUCCESSFULLY,
  },
  [HttpExceptionType.USER_CREATED]: {
    status: HttpStatus.OK,
    code: HttpExceptionType.USER_CREATED,
    message: 'User created successfully!',
  },
  [HttpExceptionType.USER_UPDATE]: {
    status: HttpStatus.OK,
    code: HttpExceptionType.USER_UPDATE,
    message: 'User updated successfully!',
  },
  [HttpExceptionType.BAD_REQUEST]: {
    status: HttpStatus.BadRequest,
    code: HttpExceptionType.BAD_REQUEST,
    message: 'Bad Request',
  },
  [HttpExceptionType.EMPTY_BODY]: {
    status: HttpStatus.BadRequest,
    code: HttpExceptionType.EMPTY_BODY,
    message: 'Empty body is not allowed. Please fill the body',
  },
  [HttpExceptionType.INVALID_CREDENTIALS]: {
    message: 'Invalid credentials',
    status: HttpStatus.BadRequest,
    code: HttpExceptionType.INVALID_CREDENTIALS,
  },
  [HttpExceptionType.TOKEN_NOT_PROVIDED]: {
    status: HttpStatus.Unauthorized,
    code: HttpExceptionType.TOKEN_NOT_PROVIDED,
    message: 'Token not provided',
  },
  [HttpExceptionType.TOKEN_EXPIRED]: {
    status: HttpStatus.Unauthorized,
    code: HttpExceptionType.TOKEN_EXPIRED,
    message: 'Token expired',
  },
  [HttpExceptionType.REFRESH_TOKEN_EXPIRED]: {
    status: HttpStatus.Unauthorized,
    code: HttpExceptionType.REFRESH_TOKEN_EXPIRED,
    message: 'Refresh token expired',
  },
  [HttpExceptionType.TOKEN_MALFORMED]: {
    status: HttpStatus.Unauthorized,
    code: HttpExceptionType.TOKEN_MALFORMED,
    message: 'Trying get data from token. Something wrong',
  },
  [HttpExceptionType.TOKEN_VERIFY]: {
    status: HttpStatus.Unauthorized,
    code: HttpExceptionType.TOKEN_VERIFY,
    message: 'Token verify error',
  },
  [HttpExceptionType.REFRESH_TOKEN_VERIFY]: {
    status: HttpStatus.Unauthorized,
    code: HttpExceptionType.REFRESH_TOKEN_VERIFY,
    message: 'Refresh token verify error',
  },
  [HttpExceptionType.WRONG_RESET_PASSWORD_TOKEN]: {
    status: HttpStatus.Unauthorized,
    code: HttpExceptionType.WRONG_RESET_PASSWORD_TOKEN,
    message: 'Reset password token is not registered. Probably it already used',
  },
  [HttpExceptionType.WRONG_EMAIL_CONFIRM_TOKEN]: {
    status: HttpStatus.Unauthorized,
    code: HttpExceptionType.WRONG_EMAIL_CONFIRM_TOKEN,
    message: 'Confirm email token is not registered. Probably it already used',
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
  [HttpExceptionType.EMAIL_ALREADY_TAKEN]: {
    message: 'This email already taken, try use another',
    status: HttpStatus.Conflict,
    code: HttpExceptionType.EMAIL_ALREADY_TAKEN,
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
