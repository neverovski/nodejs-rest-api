import { CodeResponse } from '@utils';

export default class HttpExceptionCore extends Error {
  readonly code: string;
  readonly errors?: HttpExceptionType['errors'];
  readonly message: string;
  readonly status: number;

  constructor(ctx?: Partial<HttpExceptionType>) {
    super();

    this.status = ctx?.status || CodeResponse.EXTERNAL.status;
    this.code = ctx?.code || CodeResponse.EXTERNAL.code;
    this.message = ctx?.message || CodeResponse.EXTERNAL.message;

    if (ctx?.errors) {
      this.errors = ctx.errors;
    }
  }
}
