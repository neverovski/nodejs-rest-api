import { inject, injectable } from 'tsyringe';

import { JwtConfig } from '@config';
import { ServiceCore } from '@core';
import { DateHelper } from '@helpers';
import { Crypto, Exception, HttpCode } from '@lib';
import { TokenType } from '@utils';

import {
  AccessTokenRequest,
  FullRefreshToken,
  RefreshToken,
  RefreshTokenPayload,
  TokenInject,
  TokenRequest,
} from '../auth.type';
import { IRefreshTokenRepository, ITokenService } from '../interface';

@injectable()
export default class TokenService extends ServiceCore implements ITokenService {
  private readonly typeToken: TokenType;

  constructor(
    @inject(TokenInject.TOKEN_REPOSITORY)
    private repository: IRefreshTokenRepository,
  ) {
    super();

    this.typeToken = TokenType.BEARER;
  }

  generateAccessToken(body: AccessTokenRequest) {
    return Crypto.signJWTAsync(
      {
        ...body,
        jti: Crypto.generateUUID(),
        sub: String(body.userId),
        typ: this.typeToken,
      },
      JwtConfig.secretAccessToken,
      {
        expiresIn: JwtConfig.expiresInAccessToken,
      },
    );
  }

  async generateRefreshToken(
    body: Omit<RefreshToken, 'jti' | 'expiredAt'>,
  ): Promise<string> {
    const jti = Crypto.generateUUID();
    const ms = DateHelper.toMs(JwtConfig.expiresInRefreshToken);
    const expiredAt = DateHelper.addMillisecondToDate(new Date(), ms);

    await this.repository.create({ ...body, jti, expiredAt });

    return Crypto.signJWT(
      {
        sub: String(body.userId),
        jti,
        typ: this.typeToken,
      },
      JwtConfig.secretRefreshToken,
      {
        expiresIn: JwtConfig.expiresInRefreshToken,
      },
    );
  }

  async getToken({ id, ...data }: TokenRequest, ctx: Context) {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken({ ...data, userId: id }),
      this.generateRefreshToken({ ...ctx, userId: id }),
    ]);

    return { tokenType: this.typeToken, accessToken, refreshToken };
  }

  async resolveRefreshToken(token: string): Promise<RefreshTokenPayload> {
    const payload = await this.decodeRefreshToken(token);
    const refreshTokenFromDB = await this.getRefreshTokenFromPayload(payload);

    if (refreshTokenFromDB?.isRevoked) {
      throw Exception.getError(HttpCode.REFRESH_TOKEN_EXPIRED);
    }

    if (!payload?.sub) {
      throw Exception.getError(HttpCode.TOKEN_MALFORMED);
    }

    return payload;
  }

  async update(query: Partial<FullRefreshToken>, body: Partial<RefreshToken>) {
    await this.repository.update(query, body);
  }

  private async decodeRefreshToken(
    token: string,
  ): Promise<RefreshTokenPayload> {
    try {
      return await Crypto.verifyJWTAsync<RefreshTokenPayload>(
        token,
        JwtConfig.secretRefreshToken,
      );
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      throw new Error(err);
    }
  }

  private getRefreshTokenFromPayload({
    jti,
    sub,
  }: RefreshTokenPayload): Promise<RefreshToken> {
    if (!jti && !sub) {
      throw Exception.getError(HttpCode.TOKEN_MALFORMED);
    }

    return this.repository.findOneOrFail({
      where: { userId: +sub, jti },
    });
  }
}
