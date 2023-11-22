import { Router as ExpressRouter } from 'express';
import { container } from 'tsyringe';

import { RouterCore } from '@core';
import {
  AsyncMiddleware,
  AuthMiddleware,
  UserSessionMiddleware,
  ValidateMiddleware,
} from '@middleware';

import { AuthInject, AuthRouterLink } from './auth.enum';
import { IAuthController, IAuthSchema } from './interface';

export class AuthRouter extends RouterCore {
  private readonly controller: IAuthController;
  private readonly schema: IAuthSchema;

  constructor() {
    super(ExpressRouter());

    this.controller = container.resolve<IAuthController>(AuthInject.CONTROLLER);
    this.schema = container.resolve<IAuthSchema>(AuthInject.SCHEMA);
  }

  init(): ExpressRouter {
    this.router.post(
      AuthRouterLink.LOGIN,
      UserSessionMiddleware.handler(),
      ValidateMiddleware.handler(this.schema.login()),
      AsyncMiddleware(this.controller.login.bind(this.controller)),
    );

    this.router.post(
      AuthRouterLink.REFRESH_TOKEN,
      UserSessionMiddleware.handler(),
      ValidateMiddleware.handler(this.schema.refreshToken()),
      AsyncMiddleware(this.controller.refreshToken.bind(this.controller)),
    );

    this.router.post(
      AuthRouterLink.LOGOUT,
      AuthMiddleware.handler(),
      AsyncMiddleware(this.controller.logout.bind(this.controller)),
    );

    this.router.post(
      AuthRouterLink.PLATFORM,
      UserSessionMiddleware.handler(),
      ValidateMiddleware.handler(this.schema.platform()),
      AsyncMiddleware(this.controller.platform.bind(this.controller)),
    );

    // this.router.post(
    //   '/password/email',
    //   ValidateMiddleware.handler(ForgotPasswordSchema),
    //   AsyncMiddleware(this.controller.forgotPassword.bind(this.controller)),
    // );

    // this.router.post(
    //   '/password/reset',
    //   ValidateMiddleware.handler(ResetPasswordSchema),
    //   AsyncMiddleware(this.controller.resetPassword.bind(this.controller)),
    // );

    return this.router;
  }
}
