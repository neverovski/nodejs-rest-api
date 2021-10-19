import { Router } from 'express';
import { container } from 'tsyringe';

import { RouterCore } from '@core/index';
import {
  ValidateMiddleware,
  AsyncMiddleware,
  AuthMiddleware,
} from '@middleware/index';

import AuthController from './auth.controller';
import { LoginSchema, RefreshTokenSchema, LogoutSchema } from './auth.schema';
import { AuthService } from './service';

export default class AuthRouter extends RouterCore {
  private readonly controller: AuthController;

  constructor() {
    super(Router());

    container.register('AuthService', {
      useClass: AuthService,
    });
    this.controller = container.resolve(AuthController);
  }

  init(): Router {
    this.router.post(
      '/login',
      ValidateMiddleware.handler(LoginSchema),
      AsyncMiddleware(this.controller.login),
    );

    this.router.post(
      '/refresh-token',
      ValidateMiddleware.handler(RefreshTokenSchema),
      AsyncMiddleware(this.controller.refreshToken),
    );

    this.router.post(
      '/logout',
      AuthMiddleware.handler(),
      ValidateMiddleware.handler(LogoutSchema),
      AsyncMiddleware(this.controller.logout),
    );

    return this.router;
  }
}
