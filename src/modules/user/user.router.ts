import { Router as ExpressRouter } from 'express';
import { container } from 'tsyringe';

import { RouterCore } from '@core';
import {
  AsyncMiddleware,
  AuthMiddleware,
  ValidateMiddleware,
} from '@middleware';

import { IUserController, IUserSchema } from './interface';
import { UserInject, UserRouterLink } from './user.enum';

export class UserRouter extends RouterCore {
  private readonly controller: IUserController;
  private readonly userSchema: IUserSchema;

  constructor() {
    super(ExpressRouter());

    this.controller = container.resolve<IUserController>(UserInject.CONTROLLER);
    this.userSchema = container.resolve<IUserSchema>(UserInject.SCHEMA);
  }

  init(): ExpressRouter {
    this.router.post(
      UserRouterLink.USER,
      ValidateMiddleware.handler(this.userSchema.create()),
      AsyncMiddleware(this.controller.create.bind(this.controller)),
    );

    this.router.get(
      UserRouterLink.USER_CURRENT,
      AuthMiddleware.handler(),
      AsyncMiddleware(this.controller.getCurrentUser.bind(this.controller)),
    );

    this.router.put(
      UserRouterLink.USER_CURRENT,
      AuthMiddleware.handler(),
      ValidateMiddleware.handler(this.userSchema.update()),
      AsyncMiddleware(this.controller.updateCurrentUser.bind(this.controller)),
    );

    this.router.delete(
      UserRouterLink.USER_CURRENT,
      AuthMiddleware.handler(),
      AsyncMiddleware(this.controller.deleteCurrentUser.bind(this.controller)),
    );

    this.router.put(
      UserRouterLink.USER_CURRENT_PASSWORD,
      AuthMiddleware.handler(),
      ValidateMiddleware.handler(this.userSchema.changePassword()),
      AsyncMiddleware(
        this.controller.changePasswordCurrentUser.bind(this.controller),
      ),
    );

    return this.router;
  }
}
