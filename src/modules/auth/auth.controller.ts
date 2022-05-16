import { Response, Request } from 'express';
import { injectable, inject } from 'tsyringe';

import { ControllerCore } from '@core';
import { HttpException } from '@utils';
import { ResponseHelper } from '@utils/helpers';

import {
  LoginRequest,
  RefreshTokenRequest,
  ForgotPasswordRequest,
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
  constructor(@inject('AuthService') private service: IAuthService) {
    super();
  }

  async forgotPassword(
    req: Request<any, any, ForgotPasswordRequest>,
    res: Response,
  ) {
    await this.service.forgotPassword(req.body);

    this.response(res, {
      data: ResponseHelper.success(HttpException.PASSWORD_RESET_SENT_EMAIL),
    });
  }

  async login(req: Request<any, any, LoginRequest>, res: Response) {
    const { body, ctx } = req;
    const data = await this.service.login(body, ctx);

    this.response(res, { data, dto: TokenDTO });
  }

  async logout(req: Request, res: Response) {
    const { userId } = req.user as Required<UserContext>;

    await this.service.logout({ userId });

    this.response(res);
  }

  async refreshToken(
    req: Request<any, any, RefreshTokenRequest>,
    res: Response,
  ) {
    const { body, ctx } = req;
    const data = await this.service.refreshToken(body, ctx);

    this.response(res, { data, dto: TokenDTO });
  }

  async resetPassword(
    req: Request<any, any, ResetPasswordRequest>,
    res: Response,
  ) {
    await this.service.resetPassword(req.body);

    this.response(res, {
      data: ResponseHelper.success(HttpException.PASSWORD_RESET_SUCCESSFULLY),
    });
  }
}
