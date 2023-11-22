import type { Response as ExpressResponse } from 'express';
import { inject } from 'tsyringe';

import { HttpStatus } from '@common/enums';
import { ControllerCore } from '@core';

import { AuthInject } from './auth.enum';
import {
  AuthLoginRequest,
  AuthLogoutRequest,
  AuthPlatformRequest,
  AuthRefreshToken,
  AuthRefreshTokenRequest,
} from './auth.type';
import { AuthTokenDto } from './dto';
import { IAuthController, IAuthService } from './interface';

/**
 * @openapi
 * tags:
 *   name: Auth
 *   description: auth
 */
export class AuthController extends ControllerCore implements IAuthController {
  constructor(@inject(AuthInject.SERVICE) private service: IAuthService) {
    super();
  }

  // /**
  //  * @openapi
  //  * /api/auth/password/email:
  //  *   post:
  //  *      tags: [Auth]
  //  *      summary: Forgot password
  //  *      description: ''
  //  *      requestBody:
  //  *        $ref: '#/components/requestBodies/ForgotPasswordRequest'
  //  *      responses:
  //  *        200:
  //  *          $ref: '#/components/responses/HttpOk'
  //  *        404:
  //  *          $ref: '#/components/responses/HttpNotFound'
  //  *        422:
  //  *          $ref: '#/components/responses/HttpUnprocessableEntity'
  //  *        500:
  //  *          $ref: '#/components/responses/HttpInternalServerError'
  //  */
  // async forgotPassword(
  //   req: Request<any, any, ForgotPasswordRequest>,
  //   res: Response,
  // ) {
  //   await this.service.forgotPassword(req.body);

  //   this.response(res, {
  //     data: Exception.getOk(HttpCode.OK, {
  //       message: i18n()['message.passwordReset.sentToEmail'],
  //     }),
  //   });
  // }

  /**
   * @openapi
   * /api/auth/login:
   *   post:
   *      tags: [Auth]
   *      summary: Logs user into the system by email and password
   *      description: ''
   *      requestBody:
   *        $ref: '#/components/requestBodies/LoginRequest'
   *      responses:
   *        200:
   *          $ref: '#/components/responses/TokenResponse'
   *        400:
   *          $ref: '#/components/responses/HttpBadRequest'
   *        422:
   *          $ref: '#/components/responses/HttpUnprocessableEntity'
   *        500:
   *          $ref: '#/components/responses/HttpInternalServerError'
   */
  async login({ body, userSession }: AuthLoginRequest, res: ExpressResponse) {
    const data = await this.service.login(body, { userSession });

    this.storeTokenInCookie(res, data);

    res.json(this.mappingDataToDto(data, { cls: AuthTokenDto }));
  }

  /**
   * @openapi
   * /api/auth/logout:
   *   post:
   *      tags: [Auth]
   *      summary: Logs out current logged-in user session
   *      description: ''
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
  async logout({ user }: AuthLogoutRequest, res: ExpressResponse) {
    const { userId } = user;

    await this.service.logout({ userId });

    this.storeTokenInCookie(res, {}, { maxAge: 0 });

    res.status(HttpStatus.NoContent);
  }

  /**
   * @openapi
   * /api/auth/platform:
   *   post:
   *      tags: [Auth]
   *      summary: Logs user into the system through a platform (apple, google and etc.)
   *      description: ''
   *      requestBody:
   *        $ref: '#/components/requestBodies/PlatformRequest'
   *      responses:
   *        200:
   *          $ref: '#/components/responses/TokenResponse'
   *        422:
   *          $ref: '#/components/responses/HttpUnprocessableEntity'
   *        500:
   *          $ref: '#/components/responses/HttpInternalServerError'
   */
  async platform(
    { body, userSession }: AuthPlatformRequest,
    res: ExpressResponse,
  ) {
    const data = await this.service.platform(body, { userSession });

    this.storeTokenInCookie(res, data);

    res.json(this.mappingDataToDto(data, { cls: AuthTokenDto }));
  }

  /**
   * @openapi
   * /api/auth/refresh-token:
   *   post:
   *      tags: [Auth]
   *      summary: Refresh Token
   *      description: ''
   *      requestBody:
   *        $ref: '#/components/requestBodies/RefreshTokenRequest'
   *      responses:
   *        200:
   *          $ref: '#/components/responses/TokenResponse'
   *        401:
   *          $ref: '#/components/responses/HttpUnauthorized'
   *        422:
   *          $ref: '#/components/responses/HttpUnprocessableEntity'
   *        500:
   *          $ref: '#/components/responses/HttpInternalServerError'
   */
  async refreshToken(
    { body, userSession, ...req }: AuthRefreshTokenRequest,
    res: ExpressResponse,
  ) {
    const refreshToken =
      body.refreshToken || (req.cookies as AuthRefreshToken).refreshToken;

    const data = await this.service.refreshToken(
      { refreshToken },
      { userSession },
    );

    this.storeTokenInCookie(res, data);

    res.json(this.mappingDataToDto(data, { cls: AuthTokenDto }));
  }

  // /**
  //  * @openapi
  //  * /api/auth/password/reset:
  //  *   post:
  //  *      tags: [Auth]
  //  *      summary: Reset password
  //  *      description: ''
  //  *      requestBody:
  //  *        $ref: '#/components/requestBodies/ResetPasswordRequest'
  //  *      responses:
  //  *        200:
  //  *          $ref: '#/components/responses/HttpOk'
  //  *        422:
  //  *          $ref: '#/components/responses/HttpUnprocessableEntity'
  //  *        500:
  //  *          $ref: '#/components/responses/HttpInternalServerError'
  //  */
  // async resetPassword(
  //   req: Request<any, any, ResetPasswordRequest>,
  //   res: Response,
  // ) {
  //   await this.service.resetPassword(req.body);

  //   this.response(res, {
  //     data: Exception.getOk(HttpCode.OK, {
  //       message: i18n()['message.passwordReset.successfully'],
  //     }),
  //   });
  // }
}
