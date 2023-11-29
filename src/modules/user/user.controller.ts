import type { Response as ExpressResponse } from 'express';
import { inject as Inject, injectable as Injectable } from 'tsyringe';

import { ConfigKey, HttpStatus } from '@common/enums';
import { IAppConfig, IJwtConfig } from '@config';
import { ControllerCore } from '@core';
import { i18n } from '@i18n';

import { UserDto } from './dto';
import { IUserController, IUserService } from './interface';
import {
  CreateUserRequest,
  DeleteUserRequest,
  UpdateUserRequest,
  UserPasswordChangeRequest,
  UserRequest,
} from './types';
import { UserInject } from './user.enum';

/**
 * @openapi
 * tags:
 *   name: User
 *   description: user
 */
@Injectable()
export class UserController extends ControllerCore implements IUserController {
  constructor(
    @Inject(ConfigKey.APP) protected readonly appConfig: IAppConfig,
    @Inject(ConfigKey.JWT) protected readonly jwtConfig: IJwtConfig,
    @Inject(UserInject.SERVICE) private readonly userService: IUserService,
  ) {
    super();
  }

  /**
   * @openapi
   * /api/v1/users/current/change-password:
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
    req: UserPasswordChangeRequest,
    res: ExpressResponse,
  ) {
    const { userId: id } = req.user;

    await this.userService.updatePassword({ id }, req.body);

    res.json(this.getOk(i18n()['message.passwordReset.successfully']));
  }

  /**
   * @openapi
   * /api/v1/users:
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
  async create(req: CreateUserRequest, res: ExpressResponse) {
    await this.userService.create(req.body);

    res.status(HttpStatus.Created).json({
      ...this.getOk(i18n()['message.passwordReset.successfully']),
      statusCode: HttpStatus.Created,
    });
  }

  /**
   * @openapi
   * /api/v1/users/current:
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
  async deleteCurrentUser(req: DeleteUserRequest, res: ExpressResponse) {
    const { userId } = req.user;

    await this.userService.delete({ id: userId });

    this.storeTokenInCookie(res, {}, { maxAge: 0 });

    res.status(HttpStatus.NoContent);
  }

  /**
   * @openapi
   * /api/v1/users/current:
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
  async getCurrentUser(req: UserRequest, res: ExpressResponse) {
    const { userId } = req.user;

    const data = await this.userService.getOne({ id: userId });

    res.json(this.mappingDataToDto(data, { cls: UserDto }));
  }

  /**
   * @openapi
   * /api/v1/users/current:
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
  async updateCurrentUser(req: UpdateUserRequest, res: ExpressResponse) {
    const { userId } = req.user;

    const data = await this.userService.update({ id: userId }, req.body);

    res.json(this.mappingDataToDto(data, { cls: UserDto }));
  }
}
