import { HttpStatus, MessageCode } from '@common/enums';
import { ForbiddenException } from '@common/exceptions/forbidden.exception';
import { ExceptionMessage } from '@common/types';
import { i18n } from '@i18n';

describe('ForbiddenException', () => {
  it('should create an instance with default message when no message is provided', () => {
    const exception = new ForbiddenException();

    expect(exception.messageCode).toEqual(MessageCode.FORBIDDEN);
    expect(exception.statusCode).toEqual(HttpStatus.FORBIDDEN);
    expect(exception.message).toEqual(i18n()['exception.forbidden']);
  });

  it('should create an instance with the provided message', () => {
    const message = 'Test message';
    const exception = new ForbiddenException(message);

    expect(exception.messageCode).toEqual(MessageCode.FORBIDDEN);
    expect(exception.statusCode).toEqual(HttpStatus.FORBIDDEN);
    expect(exception.message).toEqual(message);
  });

  it('should create an instance with the provided message object', () => {
    const message: ExceptionMessage = [{ key: 'test', value: 'Test message' }];
    const exception = new ForbiddenException(message);

    expect(exception.messageCode).toEqual(MessageCode.FORBIDDEN);
    expect(exception.statusCode).toEqual(HttpStatus.FORBIDDEN);
    expect(exception.message).toEqual(message);
  });
});
