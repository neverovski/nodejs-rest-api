import type {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
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
  AuthVerifyEmailRequest,
} from './auth.type';
import { AuthTokenDto } from './dto';
import { IAuthController, IAuthService } from './interface';

/**
 * @openapi
 * tags:
 *   name: Auth
 *   description: The Auth API provides endpoints for managing user authentication, including login, logout, password reset, and token refresh.
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
   * /api/auth/forgot-password/email:
   *   post:
   *      tags: [Auth]
   *      summary: Forgot password by email
   *      description: This endpoint is used when a user has forgotten their password and wants to reset it using their email.
   *      requestBody:
   *        $ref: '#/components/requestBodies/AuthForgotPasswordByEmailRequest'
   *      responses:
   *        200:
   *          $ref: '#/components/responses/HttpOkResponse'
   *        404:
   *          $ref: '#/components/responses/HttpNotFoundResponse'
   *        422:
   *          $ref: '#/components/responses/HttpUnprocessableEntityResponse'
   *        500:
   *          $ref: '#/components/responses/HttpInternalServerErrorResponse'
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
   *      description: This endpoint is used for user authentication. The user provides email and password to log into the system.
   *      requestBody:
   *        $ref: '#/components/requestBodies/AuthLoginRequest'
   *      responses:
   *        200:
   *          $ref: '#/components/responses/TokenResponse'
   *        400:
   *          $ref: '#/components/responses/HttpBadRequestResponse'
   *        422:
   *          $ref: '#/components/responses/HttpUnprocessableEntityResponse'
   *        500:
   *          $ref: '#/components/responses/HttpInternalServerErrorResponse'
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
   *      description: This endpoint is used to log out the current user session. It invalidates the user's authentication token.
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
  async logout({ user }: AuthLogoutRequest, res: ExpressResponse) {
    const { userId } = user;

    await this.service.logout({ userId });

    this.storeTokenInCookie(res, {}, { maxAge: 0 });

    return this.sendJson(res, null, { status: HttpStatus.NO_CONTENT });
  }

  /**
   * @openapi
   * /api/auth/platform:
   *   post:
   *      tags: [Auth]
   *      summary: Logs user into the system through a platform (apple, google and etc.)
   *      description: This endpoint is used for user authentication through various platforms like Apple, Google, etc. The user provides platform-specific authentication details to log into the system.
   *      requestBody:
   *        $ref: '#/components/requestBodies/AuthPlatformRequest'
   *      responses:
   *        200:
   *          $ref: '#/components/responses/TokenResponse'
   *        422:
   *          $ref: '#/components/responses/HttpUnprocessableEntityResponse'
   *        500:
   *          $ref: '#/components/responses/HttpInternalServerErrorResponse'
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
   *      description: This endpoint is used to refresh the authentication token for a user. The user provides the refresh token to get a new access token.
   *      requestBody:
   *        $ref: '#/components/requestBodies/AuthRefreshTokenRequest'
   *      responses:
   *        200:
   *          $ref: '#/components/responses/TokenResponse'
   *        401:
   *          $ref: '#/components/responses/HttpUnauthorizedResponse'
   *        422:
   *          $ref: '#/components/responses/HttpUnprocessableEntityResponse'
   *        500:
   *          $ref: '#/components/responses/HttpInternalServerErrorResponse'
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
   * /api/auth/forgot-password/email/reset:
   *   post:
   *      tags: [Auth]
   *      summary: Reset password
   *      description: Resets the user's password using the information provided in the request body.
   *      requestBody:
   *        $ref: '#/components/requestBodies/AuthResetPasswordByEmailRequest'
   *      responses:
   *        200:
   *          $ref: '#/components/responses/HttpOkResponse'
   *        422:
   *          $ref: '#/components/responses/HttpUnprocessableEntityResponse'
   *        500:
   *          $ref: '#/components/responses/HttpInternalServerErrorResponse'
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

  /**
   * @openapi
   * /api/auth/email/verify:
   *   get:
   *      tags: [Auth]
   *      summary: Send verify code by email
   *      description: This endpoint is used to request a verification code which will be sent to the user's email. The user can use this code to verify their email address.
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
  async sendVerifyCodeByEmail({ user }: ExpressRequest, res: ExpressResponse) {
    const { email } = user;

    await this.service.sendVerifyCodeByEmail({ email });
    const message = this.getMessage(i18n()['message.emailVerify.sentToEmail']);

    return this.sendJson(res, message);
  }

  /**
   * @openapi
   * /api/auth/email/verify/{code}:
   *   get:
   *      tags: [Auth]
   *      summary: Сonfirmation email
   *      description: This endpoint is used to verify the email of a user. The user provides a verification code that they received in their email.
   *      parameters:
   *        - $ref: '#/components/parameters/CodeParam'
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
  async verifyEmailByCode(
    { user, params }: AuthVerifyEmailRequest,
    res: ExpressResponse,
  ) {
    const { email } = user;
    const { code } = params;

    await this.service.verifyEmailByCode({ email, code });
    const message = this.getMessage(i18n()['message.emailVerify.successfully']);

    return this.sendJson(res, message);
  }
}
