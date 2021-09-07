import { getCustomRepository } from 'typeorm';

import { ServiceCore } from '@core/index';

import { ITokenService } from '../interface';
import { RefreshTokenRepository } from '../repository';

export class TokenService extends ServiceCore implements ITokenService {
  private readonly repository: RefreshTokenRepository;

  constructor() {
    super();

    this.repository = getCustomRepository(RefreshTokenRepository);
  }

  generateAccessToken(): void {
    throw new Error('Method not implemented.');
  }

  generateRefreshToken(): void {
    throw new Error('Method not implemented.');
  }
}
