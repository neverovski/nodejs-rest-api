import { HttpStatus, MessageCode } from '@common/enums';
import { TokenNotProvidedException } from '@common/exceptions/token-not-provided.exception';
import { i18n } from '@i18n';

describe('TokenNotProvidedException', () => {
  it('should create an instance with default message', () => {
    const exception = new TokenNotProvidedException();

    expect(exception.message).toEqual(i18n()['exception.tokenNotProvided']);
    expect(exception.messageCode).toEqual(MessageCode.TOKEN_NOT_PROVIDED);
    expect(exception.statusCode).toEqual(HttpStatus.UNAUTHORIZED);
  });
});
