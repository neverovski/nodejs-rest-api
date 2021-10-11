import AutoBin from 'auto-bind';
import { Response, Request } from 'express';

import { ControllerCore } from '@core/index';

import { Login } from './auth.type';
import { TokenDTO } from './dto';
import { IAuthService } from './interface';

/**
 * @openapi
 * tags:
 *   name: Auth
 *   description: auth
 */
export default class AuthController extends ControllerCore {
  constructor(private readonly service: IAuthService) {
    super();

    AutoBin(this);
  }

  async login(req: Request<any, any, Login>, res: Response) {
    const data = await this.service.login(req.body);

    this.response(res, { data, dto: TokenDTO });
  }
}
