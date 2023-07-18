import { HttpStatus, MessageCode } from '@common/enums';
import { i18n } from '@i18n';

import { HttpException } from './http.exception';

export class TokenExpiredException extends HttpException {
  constructor() {
    super({
      messageCode: MessageCode.TOKEN_EXPIRED,
      statusCode: HttpStatus.Unauthorized,
      message: i18n()['exception.tokenExpired'],
    });
  }
}
