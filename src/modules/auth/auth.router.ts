import { Router } from 'express';

import { RouterCore } from '@core/index';
import { ValidateMiddleware, AsyncMiddleware } from '@middleware/index';

import AuthController from './auth.controller';
import { LoginSchema } from './auth.schema';
import { AuthService } from './service';

export default class AuthRouter extends RouterCore {
  private readonly controller: AuthController;

  constructor() {
    super(Router());

    this.controller = new AuthController(new AuthService());
  }

  init(): Router {
    this.router.post(
      '/login',
      ValidateMiddleware.handler(LoginSchema),
      AsyncMiddleware(this.controller.login),
    );

    return this.router;
  }
}
