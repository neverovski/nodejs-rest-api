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
    @Inject(MiddlewareKey.ASYNC) private readonly asyncMiddleware: IMiddleware,
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
      this.asyncMiddleware.handler(this.controller.login.bind(this.controller)),
    );

    this.router.post(
      AuthRouterLink.REFRESH_TOKEN,
      this.userSessionMiddleware.handler(),
      this.validateMiddleware.handler(this.schema.refreshToken()),
      this.asyncMiddleware.handler(
        this.controller.refreshToken.bind(this.controller),
      ),
    );

    this.router.post(
      AuthRouterLink.LOGOUT,
      this.authMiddleware.handler(),
      this.asyncMiddleware.handler(
        this.controller.logout.bind(this.controller),
      ),
    );

    this.router.post(
      AuthRouterLink.PLATFORM,
      this.userSessionMiddleware.handler(),
      this.validateMiddleware.handler(this.schema.platform()),
      this.asyncMiddleware.handler(
        this.controller.platform.bind(this.controller),
      ),
    );

    this.router.post(
      AuthRouterLink.FORGOT_PASSWORD_EMAIL,
      this.validateMiddleware.handler(this.schema.forgotPasswordByEmail()),
      this.asyncMiddleware.handler(
        this.controller.forgotPasswordByEmail.bind(this.controller),
      ),
    );

    this.router.post(
      AuthRouterLink.FORGOT_PASSWORD_EMAIL_RESET,
      this.validateMiddleware.handler(this.schema.resetPasswordByEmail()),
      this.asyncMiddleware.handler(
        this.controller.resetPasswordByEmail.bind(this.controller),
      ),
    );

    this.router.get(
      AuthRouterLink.EMAIL_VERIFY,
      this.authMiddleware.handler(),
      this.asyncMiddleware.handler(
        this.controller.sendVerifyCodeByEmail.bind(this.controller),
      ),
    );

    this.router.get(
      AuthRouterLink.EMAIL_VERIFY_CODE,
      this.authMiddleware.handler(),
      this.validateMiddleware.handler(this.schema.verifyEmailByCode()),
      this.asyncMiddleware.handler(
        this.controller.verifyEmailByCode.bind(this.controller),
      ),
    );
  }
}
