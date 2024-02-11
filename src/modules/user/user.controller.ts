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
 *   description: The User API provides endpoints for managing user data, including creating, updating, retrieving, and deleting user records.
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
   *        $ref: '#/components/requestBodies/UserChangePasswordRequest'
   *      responses:
   *        200:
   *          $ref: '#/components/responses/HttpOkResponse'
   *        401:
   *          $ref: '#/components/responses/HttpUnauthorizedResponse'
   *        422:
   *          $ref: '#/components/responses/HttpUnprocessableEntityResponse'
   *        500:
   *          $ref: '#/components/responses/HttpInternalServerErrorResponse'
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

    const message = this.getMessage(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      i18n()['message.passwordChange.successfully'],
    );

    return this.sendJson(res, message);
  }

  /**
   * @openapi
   * /api/v1/users:
   *   post:
   *      tags: [User]
   *      summary: Create a user
   *      description: This endpoint is used to create a new user. The user's details are provided in the request body.
   *      requestBody:
   *        $ref: '#/components/requestBodies/UserCreateRequest'
   *      responses:
   *        201:
   *          $ref: '#/components/responses/HttpOkResponse'
   *        422:
   *          $ref: '#/components/responses/HttpUnprocessableEntityResponse'
   *        500:
   *          $ref: '#/components/responses/HttpInternalServerErrorResponse'
   */
  async create(req: CreateUserRequest, res: ExpressResponse) {
    await this.userService.create(req.body);

    const message = this.getMessage(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      i18n()['message.passwordChange.successfully'],
    );

    return this.sendJson(
      res,
      { ...message, statusCode: HttpStatus.CREATED },
      { status: HttpStatus.CREATED },
    );
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
   *          $ref: '#/components/responses/HttpNoContentResponse'
   *        401:
   *          $ref: '#/components/responses/HttpUnauthorizedResponse'
   *        500:
   *          $ref: '#/components/responses/HttpInternalServerErrorResponse'
   *      security:
   *        - CookieAuth: []
   *        - BearerAuth: []
   */
  async deleteCurrentUser(req: DeleteUserRequest, res: ExpressResponse) {
    const { userId } = req.user;

    await this.userService.delete({ id: userId });

    this.storeTokenInCookie(res, {}, { maxAge: 0 });

    return this.sendJson(res, null, { status: HttpStatus.NO_CONTENT });
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
   *          $ref: '#/components/responses/UserResponse'
   *        401:
   *          $ref: '#/components/responses/HttpUnauthorizedResponse'
   *        500:
   *          $ref: '#/components/responses/HttpInternalServerErrorResponse'
   *      security:
   *        - CookieAuth: []
   *        - BearerAuth: []
   */
  async getCurrentUser(req: UserRequest, res: ExpressResponse) {
    const { userId } = req.user;

    const userRaw = await this.userService.getOne({ id: userId });
    const user = this.mappingDataToDto(userRaw, { cls: UserDto });

    return this.sendJson(res, user);
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
   *          $ref: '#/components/responses/UserResponse'
   *        401:
   *          $ref: '#/components/responses/HttpUnauthorizedResponse'
   *        422:
   *          $ref: '#/components/responses/HttpUnprocessableEntityResponse'
   *        500:
   *          $ref: '#/components/responses/HttpInternalServerErrorResponse'
   *      security:
   *        - CookieAuth: []
   *        - BearerAuth: []
   */
  async updateCurrentUser(req: UpdateUserRequest, res: ExpressResponse) {
    const { userId } = req.user;

    const userRaw = await this.userService.update({ id: userId }, req.body);
    const user = this.mappingDataToDto(userRaw, { cls: UserDto });

    return this.sendJson(res, user);
  }
}
