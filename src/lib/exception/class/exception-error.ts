import { HttpCode, HttpStatus } from '../exception.type';

export default class ExceptionError extends Error {
  readonly code: string;
  readonly errors?: ExceptionType['errors'];
  readonly message: string;
  readonly status: number;

  constructor(ctx?: Partial<ExceptionType>) {
    super();

    this.status = ctx?.status || HttpStatus.InternalServerError;
    this.code = ctx?.code || HttpCode.SERVER_ERROR;
    this.message = ctx?.message || HttpCode.SERVER_ERROR;

    if (ctx?.errors && Object.keys(ctx.errors).length) {
      this.errors = ctx.errors;
    }
  }
}
