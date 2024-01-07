import { HttpStatus, MessageCode } from '@common/enums';
import { UnprocessableEntityException } from '@common/exceptions/unprocessable-entity.exception';
import { ExceptionMessage } from '@common/types';
import { i18n } from '@i18n';

describe('UnprocessableEntityException', () => {
  it('should create an instance with default message when no message is provided', () => {
    const exception = new UnprocessableEntityException();

    expect(exception.messageCode).toEqual(MessageCode.UNPROCESSABLE_ENTITY);
    expect(exception.statusCode).toEqual(HttpStatus.UNPROCESSABLE_ENTITY);
    expect(exception.message).toEqual(i18n()['exception.unprocessableEntity']);
  });

  it('should create an instance with the provided message', () => {
    const message = 'Test message';
    const exception = new UnprocessableEntityException(message);

    expect(exception.messageCode).toEqual(MessageCode.UNPROCESSABLE_ENTITY);
    expect(exception.statusCode).toEqual(HttpStatus.UNPROCESSABLE_ENTITY);
    expect(exception.message).toEqual(message);
  });

  it('should create an instance with the provided message object', () => {
    const message: ExceptionMessage = [{ key: 'test', value: 'Test message' }];
    const exception = new UnprocessableEntityException(message);

    expect(exception.messageCode).toEqual(MessageCode.UNPROCESSABLE_ENTITY);
    expect(exception.statusCode).toEqual(HttpStatus.UNPROCESSABLE_ENTITY);
    expect(exception.message).toEqual(message);
  });
});
