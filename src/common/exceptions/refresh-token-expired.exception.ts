import { HttpStatus, MessageCode } from '@common/enums';
import { i18n } from '@i18n';

import { HttpException } from './http.exception';

export class RefreshTokenExpiredException extends HttpException {
  constructor() {
    super({
      message: i18n()['exception.refreshTokenExpired'],
      messageCode: MessageCode.REFRESH_TOKEN_EXPIRED,
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  }
}
