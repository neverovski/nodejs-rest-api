type HttpDetail = {
  status: number;
  code: string;
  message: string;
};

export default class HttpException extends Error {
  readonly code: string;
  readonly message: string;
  readonly status: number;

  constructor(detail: HttpDetail) {
    super();

    this.status = detail.status;
    this.code = detail.code;
    this.message = detail.message;
  }
}
