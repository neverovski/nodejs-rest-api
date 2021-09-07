import { Router } from 'express';

import { RouterCore } from '@core/index';

import AuthController from './auth.controller';
import AuthService from './service/auth.service';

export default class AuthRouter extends RouterCore {
  private readonly controller: AuthController;

  constructor() {
    super(Router());

    this.controller = new AuthController(new AuthService());
  }

  init(): Router {
    return this.router;
  }
}
