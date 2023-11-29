import { Router as ExpressRouter } from 'express';

export abstract class RouterCore {
  protected readonly router: ExpressRouter;

  constructor() {
    this.router = ExpressRouter({ strict: true, caseSensitive: true });
  }

  getRouter(): ExpressRouter {
    return this.router;
  }

  protected abstract init(): void;
}
