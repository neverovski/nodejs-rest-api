import { inject as Inject, injectable as Injectable } from 'tsyringe';

import { MiddlewareKey } from '@common/enums';
import { IMiddleware } from '@common/interfaces';
import { RouterCore } from '@core';

import { IUserController, IUserSchema } from './interface';
import { UserInject, UserRouterLink } from './user.enum';

@Injectable()
export class UserRouter extends RouterCore {
  constructor(
    @Inject(MiddlewareKey.ASYNC) private readonly asyncMiddleware: IMiddleware,
    @Inject(MiddlewareKey.AUTH) private readonly authMiddleware: IMiddleware,
    @Inject(MiddlewareKey.VALIDATE)
    private readonly validateMiddleware: IMiddleware,
    @Inject(UserInject.CONTROLLER) private readonly controller: IUserController,
    @Inject(UserInject.SCHEMA) private readonly schema: IUserSchema,
  ) {
    super();

    this.init();
  }

  protected init() {
    this.router.post(
      UserRouterLink.USER,
      this.validateMiddleware.handler(this.schema.create()),
      this.asyncMiddleware.handler(
        this.controller.create.bind(this.controller),
      ),
    );

    this.router.get(
      UserRouterLink.USER_CURRENT,
      this.authMiddleware.handler(),
      this.asyncMiddleware.handler(
        this.controller.getCurrentUser.bind(this.controller),
      ),
    );

    this.router.put(
      UserRouterLink.USER_CURRENT,
      this.authMiddleware.handler(),
      this.validateMiddleware.handler(this.schema.update()),
      this.asyncMiddleware.handler(
        this.controller.updateCurrentUser.bind(this.controller),
      ),
    );

    this.router.delete(
      UserRouterLink.USER_CURRENT,
      this.authMiddleware.handler(),
      this.asyncMiddleware.handler(
        this.controller.deleteCurrentUser.bind(this.controller),
      ),
    );

    this.router.put(
      UserRouterLink.USER_CURRENT_PASSWORD,
      this.authMiddleware.handler(),
      this.validateMiddleware.handler(this.schema.changePassword()),
      this.asyncMiddleware.handler(
        this.controller.changePasswordCurrentUser.bind(this.controller),
      ),
    );
  }
}
