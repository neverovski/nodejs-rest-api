import type { Response as ExpressResponse } from 'express';
import { inject as Inject, injectable as Injectable } from 'tsyringe';

import { ConfigKey, HttpStatus } from '@common/enums';
import { IAppConfig, IJwtConfig } from '@config';
import { ControllerCore } from '@core';
import { i18n } from '@i18n';

import { AuthInject } from './auth.enum';
import {
  AuthForgotPasswordByEmailRequest,
  AuthLoginRequest,
  AuthLogoutRequest,
  AuthPlatformRequest,
  AuthRefreshToken,
  AuthRefreshTokenRequest,
  AuthResetPasswordByEmailRequest,
} from './auth.type';
import { AuthTokenDto } from './dto';
import { IAuthController, IAuthService } from './interface';

/**
 * @openapi
 * tags:
 *   name: Auth
 *   description: auth
 */
@Injectable()
export class AuthController extends ControllerCore implements IAuthController {
  constructor(
    @Inject(AuthInject.SERVICE) private readonly service: IAuthService,
    @Inject(ConfigKey.APP) protected readonly appConfig: IAppConfig,
    @Inject(ConfigKey.JWT) protected readonly jwtConfig: IJwtConfig,
  ) {
    super();
  }

  /**
   * @openapi
   * /api/auth/password/email:
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
  async forgotPasswordByEmail(
    req: AuthForgotPasswordByEmailRequest,
    res: ExpressResponse,
  ) {
    await this.service.forgotPasswordByEmail(req.body);
    const message = this.getMessage(
      i18n()['message.passwordReset.sentToEmail'],
    );

    return this.sendJson(res, message);
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
  async login({ body, userSession }: AuthLoginRequest, res: ExpressResponse) {
    const dataRaw = await this.service.login(body, { userSession });

    this.storeTokenInCookie(res, dataRaw);

    const data = this.mappingDataToDto(dataRaw, { cls: AuthTokenDto });

    return this.sendJson(res, data);
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

    return this.sendJson(res, null, { status: HttpStatus.NoContent });
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
    const dataRaw = await this.service.platform(body, { userSession });
    const data = this.mappingDataToDto(dataRaw, { cls: AuthTokenDto });

    this.storeTokenInCookie(res, dataRaw);

    return this.sendJson(res, data);
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

    const dataRaw = await this.service.refreshToken(
      { refreshToken },
      { userSession },
    );
    const data = this.mappingDataToDto(dataRaw, { cls: AuthTokenDto });

    this.storeTokenInCookie(res, dataRaw);

    return this.sendJson(res, data);
  }

  /**
   * @openapi
   * /api/auth/password/reset:
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
  async resetPasswordByEmail(
    req: AuthResetPasswordByEmailRequest,
    res: ExpressResponse,
  ) {
    await this.service.resetPasswordByEmail(req.body);
    const message = this.getMessage(
      i18n()['message.passwordReset.successfully'],
    );

    return this.sendJson(res, message);
  }
}
