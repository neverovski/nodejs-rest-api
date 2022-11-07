import ExceptionError from '../exception.error';
import { HttpCode } from '../exception.type';

export interface IException {
  getError(code: HttpCode, options?: Partial<ExceptionOption>): ExceptionError;
  getOk(code: HttpCode, options?: Partial<ExceptionOption>): ExceptionOption;
}
