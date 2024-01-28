import { HttpStatus, MessageCode } from '@common/enums';
import { ConflictException } from '@common/exceptions/conflict.exception';
import { ExceptionMessage } from '@common/types';
import { i18n } from '@i18n';

describe('ConflictException', () => {
  it('should create an instance with default message when no message is provided', () => {
    const exception = new ConflictException();

    expect(exception.messageCode).toEqual(MessageCode.CONFLICT);
    expect(exception.statusCode).toEqual(HttpStatus.CONFLICT);
    expect(exception.message).toEqual(i18n()['exception.conflict']);
  });

  it('should create an instance with the provided message', () => {
    const message = 'Test message';
    const exception = new ConflictException(message);

    expect(exception.messageCode).toEqual(MessageCode.CONFLICT);
    expect(exception.statusCode).toEqual(HttpStatus.CONFLICT);
    expect(exception.message).toEqual(message);
  });

  it('should create an instance with the provided message object', () => {
    const message: ExceptionMessage = [{ key: 'test', value: 'Test message' }];
    const exception = new ConflictException(message);

    expect(exception.messageCode).toEqual(MessageCode.CONFLICT);
    expect(exception.statusCode).toEqual(HttpStatus.CONFLICT);
    expect(exception.message).toEqual(message);
  });
});
