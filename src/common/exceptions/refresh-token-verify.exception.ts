import { HttpStatus, MessageCode } from '@common/enums';
import { i18n } from '@i18n';

import { HttpException } from './http.exception';

export class RefreshTokenVerifyException extends HttpException {
  constructor() {
    super({
      message: i18n()['exception.refreshTokenVerify'],
      messageCode: MessageCode.REFRESH_TOKEN_VERIFY,
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  }
}
