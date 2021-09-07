import { Router } from 'express';

import { RouterCore } from '@core/index';

export default class AuthRouter extends RouterCore {
  constructor() {
    super(Router());
  }

  init(): Router {
    return this.router;
  }
}
