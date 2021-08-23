import { Router } from 'express';

export default abstract class RouterCore {
  protected readonly router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  abstract init(): Router;
}
