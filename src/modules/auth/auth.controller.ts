import AutoBin from 'auto-bind';

import { ControllerCore } from '@core/index';

/**
 * @openapi
 * tags:
 *   name: Auth
 *   description: auth
 */
export default class AuthController extends ControllerCore {
  constructor() {
    super();

    this.init();
    AutoBin(this);
  }
}
