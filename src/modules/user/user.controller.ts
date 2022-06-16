import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';

import { ControllerCore } from '@core';
import { HttpException, HttpStatus } from '@utils';
import { ResponseHelper } from '@utils/helpers';

import { UserDTO } from './dto';
import { IUserService } from './interface';
import { User, Password, UserInject } from './user.type';

/**
 * @openapi
 * tags:
 *   name: User
 *   description: user
 */
@injectable()
export default class UserController extends ControllerCore {
  constructor(
    @inject(UserInject.USER_SERVICE) private userService: IUserService,
  ) {
    super();
  }

  async changePasswordCurrentUser(
    req: Request<any, any, Password>,
    res: Response,
  ) {
    const { userId: id } = req.user as Required<UserContext>;

    await this.userService.updatePassword({ id }, req.body);

    this.response(res, {
      data: ResponseHelper.success(HttpException.PASSWORD_RESET_SUCCESSFULLY),
    });
  }

  async create(req: Request<any, any, User>, res: Response) {
    await this.userService.create(req.body);

    this.response(res, {
      data: ResponseHelper.success(HttpException.USER_CREATED),
      status: HttpStatus.Created,
    });
  }

  async getCurrentUser(req: Request, res: Response) {
    const { userId } = req.user as Required<UserContext>;

    const data = await this.userService.getOne({ id: userId });

    this.response(res, { data, dto: UserDTO });
  }

  async updateCurrentUser(
    req: Request<any, any, Partial<User>>,
    res: Response,
  ) {
    const { userId } = req.user as Required<UserContext>;

    await this.userService.update({ id: userId }, req.body);

    this.response(res, {
      data: ResponseHelper.success(HttpException.USER_UPDATE),
    });
  }
}
