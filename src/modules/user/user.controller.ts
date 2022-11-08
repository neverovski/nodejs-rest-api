import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

import { ControllerCore } from '@core';
import { Exception, HttpCode, HttpStatus, i18n } from '@libs';

import { UserDTO } from './dto';
import { IUserService } from './interface';
import { Password, User, UserInject } from './user.type';

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

  /**
   * @openapi
   * /api/users/current/change-password:
   *   put:
   *      tags: [User]
   *      summary: Change password for a current user
   *      description: This can only be done by the logged-in user.
   *      requestBody:
   *        $ref: '#/components/requestBodies/ChangePasswordRequest'
   *      responses:
   *        200:
   *          $ref: '#/components/responses/HttpOk'
   *        401:
   *          $ref: '#/components/responses/HttpUnauthorized'
   *        422:
   *          $ref: '#/components/responses/HttpUnprocessableEntity'
   *        500:
   *          $ref: '#/components/responses/HttpInternalServerError'
   *      security:
   *        - CookieAuth: []
   *        - BearerAuth: []
   */
  async changePasswordCurrentUser(
    req: Request<any, any, Password>,
    res: Response,
  ) {
    const { userId: id } = req.user;

    await this.userService.updatePassword({ id }, req.body);

    this.response(res, {
      data: Exception.getOk(HttpCode.OK, {
        message: i18n()['message.passwordReset.successfully'],
      }),
    });
  }

  /**
   * @openapi
   * /api/users:
   *   post:
   *      tags: [User]
   *      summary: Create a user
   *      description: ''
   *      requestBody:
   *        $ref: '#/components/requestBodies/UserCreateRequest'
   *      responses:
   *        201:
   *          $ref: '#/components/responses/HttpOk'
   *        422:
   *          $ref: '#/components/responses/HttpUnprocessableEntity'
   *        500:
   *          $ref: '#/components/responses/HttpInternalServerError'
   */
  async create(req: Request<any, any, User>, res: Response) {
    await this.userService.create(req.body);

    this.response(res, {
      data: Exception.getOk(HttpCode.OK, {
        message: i18n()['message.user.created'],
      }),
      status: HttpStatus.Created,
    });
  }

  /**
   * @openapi
   * /api/users/current:
   *   delete:
   *      tags: [User]
   *      summary: Delete a current user
   *      description: This can only be done by the logged-in user.
   *      responses:
   *        204:
   *          $ref: '#/components/responses/HttpNoContent'
   *        401:
   *          $ref: '#/components/responses/HttpUnauthorized'
   *        500:
   *          $ref: '#/components/responses/HttpInternalServerError'
   *      security:
   *        - CookieAuth: []
   *        - BearerAuth: []
   */
  async deleteCurrentUser(
    req: Request<any, any, Partial<User>>,
    res: Response,
  ) {
    const { userId } = req.user;

    await this.userService.delete({ id: userId });

    this.deleteCookie(res, req.cookies);
    this.response(res);
  }

  /**
   * @openapi
   * /api/users/current:
   *   get:
   *      tags: [User]
   *      summary: Return a current user
   *      description: This can only be done by the logged-in user.
   *      responses:
   *        200:
   *          $ref: '#/components/responses/UserOneResponse'
   *        401:
   *          $ref: '#/components/responses/HttpUnauthorized'
   *        500:
   *          $ref: '#/components/responses/HttpInternalServerError'
   *      security:
   *        - CookieAuth: []
   *        - BearerAuth: []
   */
  async getCurrentUser(req: Request, res: Response) {
    const { userId } = req.user;

    const data = await this.userService.getOne({ id: userId });

    this.response(res, { data, dto: UserDTO });
  }

  /**
   * @openapi
   * /api/users/current:
   *   put:
   *      tags: [User]
   *      summary: Update a current user
   *      description: This can only be done by the logged-in user.
   *      requestBody:
   *        $ref: '#/components/requestBodies/UserUpdateRequest'
   *      responses:
   *        200:
   *          $ref: '#/components/responses/HttpOk'
   *        401:
   *          $ref: '#/components/responses/HttpUnauthorized'
   *        422:
   *          $ref: '#/components/responses/HttpUnprocessableEntity'
   *        500:
   *          $ref: '#/components/responses/HttpInternalServerError'
   *      security:
   *        - CookieAuth: []
   *        - BearerAuth: []
   */
  async updateCurrentUser(
    req: Request<any, any, Partial<User>>,
    res: Response,
  ) {
    const { userId } = req.user;

    await this.userService.update({ id: userId }, req.body);

    this.response(res, {
      data: Exception.getOk(HttpCode.OK, {
        message: i18n()['message.user.update'],
      }),
    });
  }
}
