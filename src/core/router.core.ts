import { Router as ExpressRouter } from 'express';

export abstract class RouterCore {
  protected readonly router: ExpressRouter;

  constructor(router: ExpressRouter) {
    this.router = router;
  }

  abstract init(): ExpressRouter;
}
