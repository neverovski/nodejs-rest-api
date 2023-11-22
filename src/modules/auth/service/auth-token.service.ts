import { inject } from 'tsyringe';

import { TokenType } from '@common/enums';
import { RefreshTokenExpiredException } from '@common/exceptions';
import { DateUtil, HashUtil } from '@common/utils';
import { JwtConfig } from '@config';
import { ServiceCore } from '@core/service';
import {
  IRefreshTokenService,
  RefreshTokenInject,
} from '@modules/refresh-token';
import { ITokenService, TokenInject } from '@providers/token';

//TODO: transfer refreshToken to redis
export class AuthTokenService extends ServiceCore {
  constructor(
    @inject(RefreshTokenInject.SERVICE)
    private refreshTokenService: IRefreshTokenService,
    @inject(TokenInject.SERVICE) private tokenService: ITokenService,
  ) {
    super();
  }

  getAccessToken(userId: Id, payload: UserPayload): Promise<string> {
    const jti = HashUtil.generateUuid();
    const expiresIn = DateUtil.toMs(JwtConfig.accessToken.expiresIn);

    return this.tokenService.signJwt(
      { ...payload, jti, sub: String(userId), typ: TokenType.BEARER },
      JwtConfig.accessToken.secret,
      { expiresIn },
    );
  }

  async getRefreshToken(userId: Id): Promise<string> {
    const jti = HashUtil.generateUuid();
    const expiresIn = DateUtil.toMs(JwtConfig.refreshToken.expiresIn);
    const expiredAt = DateUtil.addMillisecondToDate(new Date(), expiresIn);

    const [refreshToken] = await Promise.all([
      this.tokenService.signJwt(
        { sub: String(userId), jti, typ: TokenType.BEARER },
        JwtConfig.refreshToken.secret,
        { expiresIn },
      ),
      this.refreshTokenService.create({ userId, jti, expiredAt }),
    ]);

    return refreshToken;
  }

  async resolveRefreshToken(token: string): Promise<JwtPayload> {
    const payload = await this.decodeRefreshToken(token);
    const refreshToken =
      await this.refreshTokenService.getOneByPayload(payload);

    if (refreshToken?.isRevoked) {
      throw new RefreshTokenExpiredException();
    }

    return payload;
  }

  private decodeRefreshToken(token: string): Promise<JwtPayload> {
    return this.tokenService.verifyJwt<JwtPayload>(
      token,
      JwtConfig.refreshToken.secret,
    );
  }
}
