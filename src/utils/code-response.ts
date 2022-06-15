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
  PASSWORD_RESET_SENT_EMAIL = 'PASSWORD_RESET_SENT_EMAIL',
  PASSWORD_RESET_SUCCESSFULLY = 'PASSWORD_RESET_SUCCESSFULLY',
  REFRESH_TOKEN_EXPIRED = 'SESSION_EXPIRED',
  REFRESH_TOKEN_VERIFY = 'BAD_REFRESH_TOKEN',
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
  [HttpException.OK]: {
    status: HttpStatus.OK,
    code: HttpException.OK,
    message: 'Ok',
  },
  [HttpException.PASSWORD_RESET_SENT_EMAIL]: {
    message: 'Password reset code sent to email',
    status: HttpStatus.OK,
    code: HttpException.PASSWORD_RESET_SENT_EMAIL,
  },
  [HttpException.PASSWORD_RESET_SUCCESSFULLY]: {
    message: 'Password reset successfully',
    status: HttpStatus.OK,
    code: HttpException.PASSWORD_RESET_SUCCESSFULLY,
  },
  [HttpException.USER_CREATED]: {
    status: HttpStatus.OK,
    code: HttpException.USER_CREATED,
    message: 'User created successfully!',
  },
  [HttpException.USER_UPDATE]: {
    status: HttpStatus.OK,
    code: HttpException.USER_UPDATE,
    message: 'User updated successfully!',
  },
  [HttpException.BAD_REQUEST]: {
    status: HttpStatus.BadRequest,
    code: HttpException.BAD_REQUEST,
    message: 'Bad Request',
  },
  [HttpException.EMPTY_BODY]: {
    status: HttpStatus.BadRequest,
    code: HttpException.EMPTY_BODY,
    message: 'Empty body is not allowed. Please fill the body',
  },
  [HttpException.INVALID_CREDENTIALS]: {
    message: 'Invalid credentials',
    status: HttpStatus.BadRequest,
    code: HttpException.INVALID_CREDENTIALS,
  },
  [HttpException.TOKEN_NOT_PROVIDED]: {
    status: HttpStatus.Unauthorized,
    code: HttpException.TOKEN_NOT_PROVIDED,
    message: 'Token not provided',
  },
  [HttpException.TOKEN_EXPIRED]: {
    status: HttpStatus.Unauthorized,
    code: HttpException.TOKEN_EXPIRED,
    message: 'Token expired',
  },
  [HttpException.REFRESH_TOKEN_EXPIRED]: {
    status: HttpStatus.Unauthorized,
    code: HttpException.REFRESH_TOKEN_EXPIRED,
    message: 'Refresh token expired',
  },
  [HttpException.TOKEN_MALFORMED]: {
    status: HttpStatus.Unauthorized,
    code: HttpException.TOKEN_MALFORMED,
    message: 'Trying get data from token. Something wrong',
  },
  [HttpException.TOKEN_VERIFY]: {
    status: HttpStatus.Unauthorized,
    code: HttpException.TOKEN_VERIFY,
    message: 'Token verify error',
  },
  [HttpException.REFRESH_TOKEN_VERIFY]: {
    status: HttpStatus.Unauthorized,
    code: HttpException.REFRESH_TOKEN_VERIFY,
    message: 'Refresh token verify error',
  },
  [HttpException.WRONG_RESET_PASSWORD_TOKEN]: {
    status: HttpStatus.Unauthorized,
    code: HttpException.WRONG_RESET_PASSWORD_TOKEN,
    message: 'Reset password token is not registered. Probably it already used',
  },
  [HttpException.WRONG_EMAIL_CONFIRM_TOKEN]: {
    status: HttpStatus.Unauthorized,
    code: HttpException.WRONG_EMAIL_CONFIRM_TOKEN,
    message: 'Confirm email token is not registered. Probably it already used',
  },
  [HttpException.FORBIDDEN]: {
    status: HttpStatus.Forbidden,
    code: HttpException.FORBIDDEN,
    message: 'Forbidden',
  },
  [HttpException.NOT_FOUND]: {
    status: HttpStatus.NotFound,
    code: HttpException.NOT_FOUND,
    message: 'Not found',
  },
  [HttpException.EMAIL_ALREADY_TAKEN]: {
    message: 'This email already taken, try use another',
    status: HttpStatus.Conflict,
    code: HttpException.EMAIL_ALREADY_TAKEN,
  },
  [HttpException.UNPROCESSABLE_ENTITY]: {
    status: HttpStatus.UnprocessableEntity,
    code: HttpException.UNPROCESSABLE_ENTITY,
    message: 'Validation Failed',
  },
  [HttpException.EXTERNAL]: {
    message: 'External service error',
    status: HttpStatus.InternalServerError,
    code: HttpException.EXTERNAL,
  },
  [HttpException.SERVER_ERROR]: {
    message: 'Server error occurred',
    status: HttpStatus.InternalServerError,
    code: HttpException.SERVER_ERROR,
  },
  [HttpException.DB_ERROR]: {
    message: 'DB error',
    status: HttpStatus.InternalServerError,
    code: HttpException.DB_ERROR,
  },
  [HttpException.DELETE_ERROR]: {
    message: 'Deletion is not possible',
    status: HttpStatus.BadRequest,
    code: HttpException.DELETE_ERROR,
  },
} as Record<HttpException, HttpExceptionType>;
