import { ServiceCore } from '@core/index';

import { ITokenService } from '../interface';

export class TokenService extends ServiceCore implements ITokenService {
  generateAccessToken(): void {
    throw new Error('Method not implemented.');
  }

  generateRefreshToken(): void {
    throw new Error('Method not implemented.');
  }
}
