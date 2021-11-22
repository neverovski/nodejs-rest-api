import { Response, Request } from 'express';
import { injectable, inject } from 'tsyringe';

import { ControllerCore } from '@core/index';

import { LoginRequest, RefreshTokenRequest } from './auth.type';
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
    req: Request<any, any, Pick<LoginRequest, 'email'>>,
    res: Response,
  ) {
    const { email } = req.body;
    const data = await this.service.forgotPassword({ email });

    this.response(res, { data });
  }

  async login(req: Request<any, any, LoginRequest>, res: Response) {
    const data = await this.service.login(req.body);

    this.response(res, { data, dto: TokenDTO });
  }

  async logout(req: Request, res: Response) {
    const { userId } = req.currentUser;

    await this.service.logout({ userId });

    this.response(res);
  }

  async refreshToken(
    req: Request<any, any, RefreshTokenRequest>,
    res: Response,
  ) {
    const data = await this.service.refreshToken(req.body);

    this.response(res, { data, dto: TokenDTO });
  }
}
