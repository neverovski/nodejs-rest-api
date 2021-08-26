import AutoBin from 'auto-bind';

import { ControllerCore } from '@core/index';

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

    this.init();
    AutoBin(this);
  }
}
