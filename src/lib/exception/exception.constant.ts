import { HttpCode, HttpStatus } from './exception.type';

export const CODE_RESPONSE = {
  [HttpCode.OK]: {
    code: HttpCode.OK,
    message: `message.code.${HttpCode.OK}`,
    status: HttpStatus.OK,
  },
  [HttpCode.BAD_REQUEST]: {
    code: HttpCode.BAD_REQUEST,
    message: `message.code.${HttpCode.BAD_REQUEST}`,
    status: HttpStatus.BadRequest,
  },
  [HttpCode.EMPTY_BODY]: {
    code: HttpCode.EMPTY_BODY,
    message: `message.code.${HttpCode.EMPTY_BODY}`,
    status: HttpStatus.BadRequest,
  },
  [HttpCode.INVALID_CREDENTIALS]: {
    code: HttpCode.INVALID_CREDENTIALS,
    message: `message.code.${HttpCode.INVALID_CREDENTIALS}`,
    status: HttpStatus.BadRequest,
  },
  [HttpCode.TOKEN_NOT_PROVIDED]: {
    code: HttpCode.TOKEN_NOT_PROVIDED,
    message: `message.code.${HttpCode.TOKEN_NOT_PROVIDED}`,
    status: HttpStatus.Unauthorized,
  },
  [HttpCode.TOKEN_EXPIRED]: {
    code: HttpCode.TOKEN_EXPIRED,
    message: `message.code.${HttpCode.TOKEN_EXPIRED}`,
    status: HttpStatus.Unauthorized,
  },
  [HttpCode.REFRESH_TOKEN_EXPIRED]: {
    code: HttpCode.REFRESH_TOKEN_EXPIRED,
    message: `message.code.${HttpCode.REFRESH_TOKEN_EXPIRED}`,
    status: HttpStatus.Unauthorized,
  },
  [HttpCode.TOKEN_MALFORMED]: {
    code: HttpCode.TOKEN_MALFORMED,
    message: `message.code.${HttpCode.TOKEN_MALFORMED}`,
    status: HttpStatus.Unauthorized,
  },
  [HttpCode.TOKEN_VERIFY]: {
    code: HttpCode.TOKEN_VERIFY,
    message: `message.code.${HttpCode.TOKEN_VERIFY}`,
    status: HttpStatus.Unauthorized,
  },
  [HttpCode.REFRESH_TOKEN_VERIFY]: {
    code: HttpCode.REFRESH_TOKEN_VERIFY,
    message: `message.code.${HttpCode.REFRESH_TOKEN_VERIFY}`,
    status: HttpStatus.Unauthorized,
  },
  [HttpCode.FORBIDDEN]: {
    code: HttpCode.FORBIDDEN,
    message: `message.code.${HttpCode.FORBIDDEN}`,
    status: HttpStatus.Forbidden,
  },
  [HttpCode.NOT_FOUND]: {
    code: HttpCode.NOT_FOUND,
    message: `message.code.${HttpCode.NOT_FOUND}`,
    status: HttpStatus.NotFound,
  },
  [HttpCode.EMAIL_ALREADY_TAKEN]: {
    code: HttpCode.EMAIL_ALREADY_TAKEN,
    message: `message.code.${HttpCode.EMAIL_ALREADY_TAKEN}`,
    status: HttpStatus.Conflict,
  },
  [HttpCode.UNPROCESSABLE_ENTITY]: {
    code: HttpCode.UNPROCESSABLE_ENTITY,
    message: `message.code.${HttpCode.UNPROCESSABLE_ENTITY}`,
    status: HttpStatus.UnprocessableEntity,
  },
  [HttpCode.EXTERNAL]: {
    code: HttpCode.EXTERNAL,
    message: `message.code.${HttpCode.EXTERNAL}`,
    status: HttpStatus.InternalServerError,
  },
  [HttpCode.SERVER_ERROR]: {
    code: HttpCode.SERVER_ERROR,
    message: `message.code.${HttpCode.SERVER_ERROR}`,
    status: HttpStatus.InternalServerError,
  },
  [HttpCode.DB_ERROR]: {
    code: HttpCode.DB_ERROR,
    message: `message.code.${HttpCode.DB_ERROR}`,
    status: HttpStatus.InternalServerError,
  },
  [HttpCode.DELETE_ERROR]: {
    code: HttpCode.DELETE_ERROR,
    message: `message.code.${HttpCode.DELETE_ERROR}`,
    status: HttpStatus.BadRequest,
  },
} as Record<HttpCode, ExceptionType>;
