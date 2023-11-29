import { inject as Inject, injectable as Injectable } from 'tsyringe';

import { MiddlewareKey } from '@common/enums';
import { IMiddleware } from '@common/interfaces';
import { RouterCore } from '@core';

import { AuthInject, AuthRouterLink } from './auth.enum';
import { IAuthController, IAuthSchema } from './interface';

@Injectable()
export class AuthRouter extends RouterCore {
  constructor(
    @Inject(AuthInject.CONTROLLER) private readonly controller: IAuthController,
    @Inject(AuthInject.SCHEMA) private readonly schema: IAuthSchema,
    @Inject(MiddlewareKey.AUTH) private readonly authMiddleware: IMiddleware,
    @Inject(MiddlewareKey.USER_SESSION)
    private readonly userSessionMiddleware: IMiddleware,
    @Inject(MiddlewareKey.VALIDATE)
    private readonly validateMiddleware: IMiddleware,
  ) {
    super();

    this.init();
  }

  protected init() {
    this.router.post(
      AuthRouterLink.LOGIN,
      this.userSessionMiddleware.handler(),
      this.validateMiddleware.handler(this.schema.login()),
      this.controller.login.bind(this.controller),
    );

    this.router.post(
      AuthRouterLink.REFRESH_TOKEN,
      this.userSessionMiddleware.handler(),
      this.validateMiddleware.handler(this.schema.refreshToken()),
      this.controller.refreshToken.bind(this.controller),
    );

    this.router.post(
      AuthRouterLink.LOGOUT,
      this.authMiddleware.handler(),
      this.controller.logout.bind(this.controller),
    );

    this.router.post(
      AuthRouterLink.PLATFORM,
      this.userSessionMiddleware.handler(),
      this.validateMiddleware.handler(this.schema.platform()),
      this.controller.platform.bind(this.controller),
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
  }
}
