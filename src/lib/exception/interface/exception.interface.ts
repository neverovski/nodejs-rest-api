import { ExceptionError } from '../class';
import { HttpCode } from '../exception.type';

export interface IException {
  getError(code: HttpCode, options?: Partial<ExceptionType>): ExceptionError;
  getOk(code: HttpCode, options?: Partial<ExceptionType>): ExceptionType;
}
