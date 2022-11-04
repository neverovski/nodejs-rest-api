import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

import { ControllerCore } from '@core';
import { Exception, HttpCode, i18n } from '@lib';
import { PlatformRequest } from '@modules/platform';

import {
  AuthInject,
  ForgotPasswordRequest,
  LoginRequest,
  RefreshTokenRequest,
  ResetPasswordRequest,
} from './auth.type';
import { TokenDTO } from './dto';
import { IAuthService } from './interface';

/**
 * @openapi
 * tags:
 *   name: Auth
 *   description: auth
 */
@injectable()
export default class AuthController extends ControllerCore {
  constructor(@inject(AuthInject.AUTH_SERVICE) private service: IAuthService) {
    super();
  }

  /**
   * @openapi
   * /api/auth/forgot-password:
   *   post:
   *      tags: [Auth]
   *      summary: Forgot password
   *      description: ''
   *      requestBody:
   *        $ref: '#/components/requestBodies/ForgotPasswordRequest'
   *      responses:
   *        200:
   *          $ref: '#/components/responses/HttpOk'
   *        404:
   *          $ref: '#/components/responses/HttpNotFound'
   *        422:
   *          $ref: '#/components/responses/HttpUnprocessableEntity'
   *        500:
   *          $ref: '#/components/responses/HttpInternalServerError'
   */
  async forgotPassword(
    req: Request<any, any, ForgotPasswordRequest>,
    res: Response,
  ) {
    await this.service.forgotPassword(req.body);

    this.response(res, {
      data: Exception.getOk(HttpCode.OK, {
        message: i18n()['message.passwordReset.sentToEmail'],
      }),
    });
  }

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
  async login(req: Request<any, any, LoginRequest>, res: Response) {
    const { body, ctx } = req;
    const data = await this.service.login(body, ctx);

    this.setCookie(res, data);
    this.response(res, { data, dto: TokenDTO });
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
  async logout(req: Request, res: Response) {
    const { userId } = req.user;

    await this.service.logout({ userId });

    this.deleteCookie(res, req.cookies);
    this.response(res);
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
  async platform(req: Request<any, any, PlatformRequest>, res: Response) {
    const { body, ctx } = req;
    const data = await this.service.platform(body, ctx);

    this.setCookie(res, data);
    this.response(res, { data, dto: TokenDTO });
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
    req: Request<any, any, RefreshTokenRequest>,
    res: Response,
  ) {
    const { body, ctx } = req;
    const refreshToken =
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (req?.cookies?.refreshToken as string) || body.refreshToken || '';
    const data = await this.service.refreshToken({ refreshToken }, ctx);

    this.setCookie(res, data);
    this.response(res, { data, dto: TokenDTO });
  }

  /**
   * @openapi
   * /api/auth/reset-password:
   *   post:
   *      tags: [Auth]
   *      summary: Reset password
   *      description: ''
   *      requestBody:
   *        $ref: '#/components/requestBodies/ResetPasswordRequest'
   *      responses:
   *        200:
   *          $ref: '#/components/responses/HttpOk'
   *        422:
   *          $ref: '#/components/responses/HttpUnprocessableEntity'
   *        500:
   *          $ref: '#/components/responses/HttpInternalServerError'
   */
  async resetPassword(
    req: Request<any, any, ResetPasswordRequest>,
    res: Response,
  ) {
    await this.service.resetPassword(req.body);

    this.response(res, {
      data: Exception.getOk(HttpCode.OK, {
        message: i18n()['message.passwordReset.successfully'],
      }),
    });
  }
}
