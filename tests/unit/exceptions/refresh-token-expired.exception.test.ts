import { HttpStatus, MessageCode } from '@common/enums';
import { RefreshTokenExpiredException } from '@common/exceptions/refresh-token-expired.exception';
import { i18n } from '@i18n';

describe('RefreshTokenExpiredException', () => {
  it('should create an instance with default message', () => {
    const exception = new RefreshTokenExpiredException();

    expect(exception.message).toEqual(i18n()['exception.refreshTokenExpired']);
    expect(exception.messageCode).toEqual(MessageCode.REFRESH_TOKEN_EXPIRED);
    expect(exception.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
  });
});
