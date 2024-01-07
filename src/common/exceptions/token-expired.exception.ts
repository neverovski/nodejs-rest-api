import { HttpStatus, MessageCode } from '@common/enums';
import { i18n } from '@i18n';

import { HttpException } from './http.exception';

export class TokenExpiredException extends HttpException {
  constructor() {
    super({
      message: i18n()['exception.tokenExpired'],
      messageCode: MessageCode.TOKEN_EXPIRED,
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  }
}
