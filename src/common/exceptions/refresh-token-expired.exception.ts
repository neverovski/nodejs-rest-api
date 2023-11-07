import { HttpStatus, MessageCode } from '@common/enums';
import { i18n } from '@i18n';

import { HttpException } from './http.exception';

export class RefreshTokenExpiredException extends HttpException {
  constructor() {
    super({
      messageCode: MessageCode.REFRESH_TOKEN_EXPIRED,
      statusCode: HttpStatus.Unauthorized,
      message: i18n()['exception.refreshTokenExpired'],
    });
  }
}
