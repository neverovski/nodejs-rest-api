import { nanoid } from 'nanoid';
import { injectable, inject } from 'tsyringe';

import { JwtConfig } from '@config';
import { ServiceCore } from '@core';
import { JWTService } from '@providers/jwt';
import { TokenType, HttpException } from '@utils';
import { DateHelper, ResponseHelper } from '@utils/helpers';

import {
  RefreshToken,
  RefreshTokenPayload,
  FullRefreshToken,
  AcessTokenRequest,
  TokenRequest,
  TokenInject,
} from '../auth.type';
import { ITokenService, IRefreshTokenRepository } from '../interface';

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

  generateAccessToken(body: AcessTokenRequest) {
    const opts = {
      expiresIn: JwtConfig.expiresInAccessToken,
    };
    const payload = {
      ...body,
      jti: nanoid(),
      sub: String(body.userId),
      typ: this.typeToken,
    };

    return JWTService.signAsync(payload, JwtConfig.secretAccessToken, opts);
  }

  async generateRefreshToken(
    body: Omit<RefreshToken, 'jti' | 'expiredAt'>,
  ): Promise<string> {
    const jti = nanoid();
    const ms = DateHelper.toMs(JwtConfig.expiresInRefreshToken);
    const expiredAt = DateHelper.addMillisecondToDate(new Date(), ms);

    await this.repository.create({ ...body, jti, expiredAt });

    const opts = {
      expiresIn: JwtConfig.expiresInRefreshToken,
    };
    const payload = {
      sub: String(body.userId),
      jti,
      typ: this.typeToken,
    };

    return JWTService.sign(payload, JwtConfig.secretRefreshToken, opts);
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
      throw ResponseHelper.error(HttpException.REFRESH_TOKEN_EXPIRED);
    }

    if (!payload?.sub) {
      throw ResponseHelper.error(HttpException.TOKEN_MALFORMED);
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
      return await JWTService.verifyAsync<RefreshTokenPayload>(
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
      throw ResponseHelper.error(HttpException.TOKEN_MALFORMED);
    }

    return this.repository.findOneOrFail({
      where: { userId: +sub, jti },
    });
  }
}
