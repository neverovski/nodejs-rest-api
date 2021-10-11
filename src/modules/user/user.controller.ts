import AutoBind from 'auto-bind';
import { Request, Response } from 'express';

import { ControllerCore } from '@core/index';
import { HttpExceptionType, HttpStatus } from '@utils/index';

import { UserDTO } from './dto';
import { IUserService } from './interface';
import { User } from './user.type';

/**
 * @openapi
 * tags:
 *   name: User
 *   description: user
 */
export default class UserController extends ControllerCore {
  constructor(private readonly service: IUserService) {
    super();

    AutoBind(this);
  }

  async create(req: Request<any, any, User>, res: Response) {
    await this.service.create(req.body);

    this.response(res, {
      data: HttpExceptionType.USER_CREATED,
      status: HttpStatus.Created,
    });
  }

  async current(req: Request, res: Response) {
    const { userId } = req.currentUser;

    const data = await this.service.getOne({ id: userId });

    this.response(res, { data, dto: UserDTO });
  }
}
