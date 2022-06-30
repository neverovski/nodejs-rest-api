import { injectable, inject } from 'tsyringe';

import { JwtConfig } from '@config';
import { ServiceCore } from '@core';
import { JwtInject, IJwtService } from '@providers/jwt';
import { TokenType, HttpException } from '@utils';
import { StringHelper, DateHelper, ResponseHelper } from '@utils/helpers';

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
    @inject(JwtInject.JWT_SERVICE) private jwtService: IJwtService,
  ) {
    super();

    this.typeToken = TokenType.BEARER;
  }

  generateAccessToken(body: AcessTokenRequest) {
    return this.jwtService.signAsync(
      {
        ...body,
        jti: StringHelper.uuid(),
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
    const jti = StringHelper.uuid();
    const ms = DateHelper.toMs(JwtConfig.expiresInRefreshToken);
    const expiredAt = DateHelper.addMillisecondToDate(new Date(), ms);

    await this.repository.create({ ...body, jti, expiredAt });

    return this.jwtService.sign(
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
      return await this.jwtService.verifyAsync<RefreshTokenPayload>(
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
