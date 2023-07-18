import { HttpStatus, MessageCode } from '@common/enums';
import { Exception } from '@common/types';
import { i18n } from '@i18n';

export class HttpException extends Error {
  readonly message: string | object | any;
  readonly messageCode: MessageCode;
  readonly statusCode: HttpStatus;

  constructor(param?: Partial<Exception>) {
    super();

    this.messageCode = param?.messageCode || MessageCode.INTERNAL_SERVER_ERROR;
    this.statusCode = param?.statusCode || HttpStatus.InternalServerError;
    this.message = param?.message || i18n()['exception.serverError'];
  }
}
