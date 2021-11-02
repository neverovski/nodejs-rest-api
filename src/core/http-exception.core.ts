type HttpDetail = {
  code: string;
  message: string;
  status: number;
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
