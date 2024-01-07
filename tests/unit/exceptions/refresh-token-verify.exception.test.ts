import { HttpStatus, MessageCode } from '@common/enums';
import { RefreshTokenVerifyException } from '@common/exceptions/refresh-token-verify.exception';
import { i18n } from '@i18n';

describe('RefreshTokenVerifyException', () => {
  it('should create an instance with default message', () => {
    const exception = new RefreshTokenVerifyException();

    expect(exception.message).toEqual(i18n()['exception.refreshTokenVerify']);
    expect(exception.messageCode).toEqual(MessageCode.REFRESH_TOKEN_VERIFY);
    expect(exception.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
  });
});
