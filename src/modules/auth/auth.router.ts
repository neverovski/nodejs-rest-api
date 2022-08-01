import { Router } from 'express';
import { container } from 'tsyringe';

import { RouterCore } from '@core';
import {
  AsyncMiddleware,
  AuthMiddleware,
  ValidateMiddleware,
} from '@middleware';

import AuthController from './auth.controller';
import {
  ForgotPasswordSchema,
  LoginSchema,
  LogoutSchema,
  PlatformSchema,
  RefreshTokenSchema,
  ResetPasswordSchema,
} from './auth.schema';

export default class AuthRouter extends RouterCore {
  private readonly controller: AuthController;

  constructor() {
    super(Router());

    this.controller = container.resolve(AuthController);
  }

  init(): Router {
    this.router.post(
      '/login',
      ValidateMiddleware.handler(LoginSchema),
      AsyncMiddleware(this.controller.login.bind(this.controller)),
    );

    this.router.post(
      '/refresh-token',
      ValidateMiddleware.handler(RefreshTokenSchema),
      AsyncMiddleware(this.controller.refreshToken.bind(this.controller)),
    );

    this.router.post(
      '/logout',
      AuthMiddleware.handler(),
      ValidateMiddleware.handler(LogoutSchema),
      AsyncMiddleware(this.controller.logout.bind(this.controller)),
    );

    this.router.post(
      '/platform',
      ValidateMiddleware.handler(PlatformSchema),
      AsyncMiddleware(this.controller.platform.bind(this.controller)),
    );

    this.router.post(
      '/forgot-password',
      ValidateMiddleware.handler(ForgotPasswordSchema),
      AsyncMiddleware(this.controller.forgotPassword.bind(this.controller)),
    );

    this.router.post(
      '/reset-password',
      ValidateMiddleware.handler(ResetPasswordSchema),
      AsyncMiddleware(this.controller.resetPassword.bind(this.controller)),
    );

    return this.router;
  }
}
