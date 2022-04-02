import { nanoid } from 'nanoid';
import { injectable, inject } from 'tsyringe';
import { getCustomRepository } from 'typeorm';

import { JwtConfig } from '@config';
import { ServiceCore } from '@core';
import { IUserService, FullUser } from '@modules/user';
import { JWTService } from '@providers/jwt';
import { TokenType, HttpExceptionType } from '@utils';
import { DateHelper, ResponseHelper } from '@utils/helpers';

import {
  RefreshToken,
  RefreshTokenPayload,
  FullRefreshToken,
  AcessTokenRequest,
  TokenRequest,
} from '../auth.type';
import { ITokenService } from '../interface';
import { RefreshTokenRepository } from '../repository';

@injectable()
export default class TokenService extends ServiceCore implements ITokenService {
  private readonly repository: RefreshTokenRepository;
  private readonly typeToken: TokenType;

  constructor(@inject('UserService') private userService: IUserService) {
    super();

    this.typeToken = TokenType.BEARER;
    this.repository = getCustomRepository(RefreshTokenRepository);
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

    await this.repository.createRefreshToken({ ...body, jti, expiredAt });

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

  async getToken(body: TokenRequest) {
    const { id, ...data } = body;

    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken({ ...data, userId: id }),
      this.generateRefreshToken({ userId: id }),
    ]);

    return { tokenType: this.typeToken, accessToken, refreshToken };
  }

  async resolveRefreshToken(
    token: string,
  ): Promise<{ token: RefreshToken; user: FullUser }> {
    const payload = await this.decodeRefreshToken(token);
    const refreshTokenFromDB = await this.getRefreshTokenFromPayload(payload);

    if (refreshTokenFromDB?.isRevoked) {
      throw ResponseHelper.error(HttpExceptionType.REFRESH_TOKEN_EXPIRED);
    }

    const user = await this.getUserFromRefreshTokenPayload(payload);

    if (!user) {
      throw ResponseHelper.error(HttpExceptionType.TOKEN_MALFORMED);
    }

    return { user, token: refreshTokenFromDB };
  }

  async update(query: Partial<FullRefreshToken>, body: Partial<RefreshToken>) {
    await this.repository.updateEntity(query, body);
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

  private getRefreshTokenFromPayload(
    payload: RefreshTokenPayload,
  ): Promise<RefreshToken> {
    const { jti, sub } = payload;

    if (!jti && !sub) {
      throw ResponseHelper.error(HttpExceptionType.TOKEN_MALFORMED);
    }

    return this.repository.findOneOrFail({ userId: +sub, jti });
  }

  private getUserFromRefreshTokenPayload(
    payload: RefreshTokenPayload,
  ): Promise<FullUser> {
    const { sub } = payload;

    if (!sub) {
      throw ResponseHelper.error(HttpExceptionType.TOKEN_MALFORMED);
    }

    return this.userService.getOne({ id: +sub });
  }
}
