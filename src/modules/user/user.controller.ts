import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';

import { ControllerCore } from '@core/index';
import { HttpExceptionType, HttpStatus, codeSuccess } from '@utils/index';

import { UserDTO } from './dto';
import { IUserService } from './interface';
import { User } from './user.type';

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
      data: codeSuccess(HttpExceptionType.USER_CREATED),
      status: HttpStatus.Created,
    });
  }

  async current(req: Request, res: Response) {
    const { userId } = req.currentUser;

    const data = await this.service.getOne({ id: userId });

    this.response(res, { data, dto: UserDTO });
  }
}
