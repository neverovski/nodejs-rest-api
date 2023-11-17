import { Router } from 'express';
import { container } from 'tsyringe';
import { RouterCore } from '@core';
import {
  AsyncMiddleware,
  AuthMiddleware,
  ValidateMiddleware,
} from '@middleware';
import { IUserController, IUserSchema } from './interface';
import { UserInject } from './user.enum';

export class UserRouter extends RouterCore {
  private readonly controller: IUserController;
  private readonly userSchema: IUserSchema;

  constructor() {
    super(Router());

    this.controller = container.resolve<IUserController>(UserInject.CONTROLLER);
    this.userSchema = container.resolve<IUserSchema>(UserInject.SCHEMA);
  }

  init(): Router {
    this.router.post(
      UserRouter,
      ValidateMiddleware.handler(this.userSchema.create()),
      AsyncMiddleware(this.controller.create.bind(this.controller)),
    );

    this.router.get(
      '/current',
      AuthMiddleware.handler(),
      AsyncMiddleware(this.controller.getCurrentUser.bind(this.controller)),
    );

    this.router.put(
      '/current',
      AuthMiddleware.handler(),
      ValidateMiddleware.handler(this.userSchema.update()),
      AsyncMiddleware(this.controller.updateCurrentUser.bind(this.controller)),
    );

    this.router.delete(
      '/current',
      AuthMiddleware.handler(),
      AsyncMiddleware(this.controller.deleteCurrentUser.bind(this.controller)),
    );

    this.router.put(
      '/current/change-password',
      AuthMiddleware.handler(),
      ValidateMiddleware.handler(this.userSchema.changePassword()),
      AsyncMiddleware(
        this.controller.changePasswordCurrentUser.bind(this.controller),
      ),
    );

    return this.router;
  }
}
