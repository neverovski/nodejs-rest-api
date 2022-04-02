import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';

import { ControllerCore } from '@core';
import { HttpExceptionType, HttpStatus } from '@utils';
import { ResponseHelper } from '@utils/helpers';

import { UserDTO } from './dto';
import { IUserService } from './interface';
import { User, UserUpdateRequest, Password } from './user.type';

/**
 * @openapi
 * tags:
 *   name: User
 *   description: user
 */
@injectable()
export default class UserController extends ControllerCore {
  constructor(@inject('UserService') private service: IUserService) {
    super();
  }

  async create(req: Request<any, any, User>, res: Response) {
    await this.service.create(req.body);

    this.response(res, {
      data: ResponseHelper.success(HttpExceptionType.USER_CREATED),
      status: HttpStatus.Created,
    });
  }

  async getCurrentUser(req: Request, res: Response) {
    const { userId } = req.currentUser;

    const data = await this.service.getOne({ id: userId });

    this.response(res, { data, dto: UserDTO });
  }

  async resetPassword(req: Request<any, any, Password>, res: Response) {
    const { userId } = req.currentUser;

    await this.service.updatePassword({ id: userId }, req.body);

    this.response(res, {
      data: ResponseHelper.success(
        HttpExceptionType.PASSWORD_RESET_SUCCESSFULLY,
      ),
    });
  }

  async updateCurrentUser(
    req: Request<any, any, UserUpdateRequest>,
    res: Response,
  ) {
    const { userId } = req.currentUser;

    await this.service.update({ id: userId }, req.body);

    this.response(res, {
      data: ResponseHelper.success(HttpExceptionType.USER_UPDATE),
    });
  }
}
