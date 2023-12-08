import { inject as Inject, injectable as Injectable } from 'tsyringe';

import { ConfigKey, TokenType } from '@common/enums';
import { RefreshTokenExpiredException } from '@common/exceptions';
import { DateUtil, HashUtil } from '@common/utils';
import { IJwtConfig } from '@config';
import { ServiceCore } from '@core/service';
import {
  IRefreshTokenService,
  RefreshTokenInject,
} from '@modules/refresh-token';
import { ILoggerService, LoggerInject } from '@providers/logger';
import { ITokenService, TokenInject } from '@providers/token';

//TODO: transfer refreshToken to redis
@Injectable()
export class AuthTokenService extends ServiceCore {
  constructor(
    @Inject(ConfigKey.JWT) private jwtConfig: IJwtConfig,
    @Inject(LoggerInject.SERVICE) protected readonly logger: ILoggerService,
    @Inject(RefreshTokenInject.SERVICE)
    private refreshTokenService: IRefreshTokenService,
    @Inject(TokenInject.SERVICE) private tokenService: ITokenService,
  ) {
    super();
  }

  getAccessToken(userId: Id, payload: UserPayload): Promise<string> {
    const jti = HashUtil.generateUuid();
    const expiresIn = DateUtil.parseStringToMs(
      this.jwtConfig.accessToken.expiresIn,
    );

    return this.tokenService.signJwt(
      { ...payload, jti, sub: String(userId), typ: TokenType.BEARER },
      this.jwtConfig.accessToken.secret,
      { expiresIn },
    );
  }

  async getRefreshToken(userId: Id): Promise<string> {
    const jti = HashUtil.generateUuid();
    const expiresIn = DateUtil.parseStringToMs(
      this.jwtConfig.refreshToken.expiresIn,
    );
    const expiredAt = DateUtil.addMillisecondToDate(new Date(), expiresIn);

    const [refreshToken] = await Promise.all([
      this.tokenService.signJwt(
        { sub: String(userId), jti, typ: TokenType.BEARER },
        this.jwtConfig.refreshToken.secret,
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
      this.jwtConfig.refreshToken.secret,
    );
  }
}
