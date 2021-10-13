import { Router } from 'express';

import { RouterCore } from '@core/index';
import {
  AsyncMiddleware,
  ValidateMiddleware,
  AuthMiddleware,
} from '@middleware/index';

import UserController from './user.controller';
import { CreateUserSchema } from './user.schema';
import UserService from './user.service';

export default class UserRouter extends RouterCore {
  private readonly controller: UserController;

  constructor() {
    super(Router());

    this.controller = new UserController(new UserService());
  }

  init(): Router {
    this.router.post(
      '/',
      ValidateMiddleware.handler(CreateUserSchema),
      AsyncMiddleware(this.controller.create),
    );

    this.router.get(
      '/current',
      AuthMiddleware.handler(),
      AsyncMiddleware(this.controller.current),
    );

    return this.router;
  }
}
