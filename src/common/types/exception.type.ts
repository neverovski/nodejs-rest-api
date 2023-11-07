import { HttpStatus, MessageCode } from '@common/enums';

export type ExceptionMessage = string | { key: string; value: string }[];

export type Exception = {
  message: ExceptionMessage;
  messageCode: MessageCode;
  statusCode: HttpStatus;
};
