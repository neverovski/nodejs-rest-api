import { nanoid } from 'nanoid';
import { getCustomRepository } from 'typeorm';

import { JwtConfig } from '@config/index';
import { ServiceCore } from '@core/index';
import { generateToken, convertToMS, addMilliseconds } from '@utils/index';

import { RefreshToken } from '../auth.type';
import { ITokenService } from '../interface';
import { RefreshTokenRepository } from '../repository';

export class TokenService extends ServiceCore implements ITokenService {
  private readonly repository: RefreshTokenRepository;

  constructor() {
    super();

    this.repository = getCustomRepository(RefreshTokenRepository);
  }

  generateAccessToken() {
    const jwtid = nanoid();
    const opts = {
      expiresIn: JwtConfig.expiresInAccessToken,
      jwtid,
    };

    return generateToken(opts, JwtConfig.secretAccessToken);
  }

  async generateRefreshToken(
    body: Omit<RefreshToken, 'jwtid' | 'expiredAt'>,
  ): Promise<string> {
    const jwtid = nanoid();
    const ms = convertToMS(JwtConfig.expiresInRefreshToken);
    const expiredAt = addMilliseconds(new Date(), ms);

    await this.repository.createRefreshToken({ ...body, jwtid, expiredAt });

    const opts = {
      expiresIn: JwtConfig.expiresInRefreshToken,
      subject: String(body.userId),
      jwtid,
    };

    return generateToken(opts, JwtConfig.secretRefreshToken);
  }
}
