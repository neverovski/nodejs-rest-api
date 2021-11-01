import { nanoid } from 'nanoid';
import { getCustomRepository } from 'typeorm';

import { JwtConfig } from '@config/index';
import { ServiceCore } from '@core/index';
import { UserService, FullUser } from '@modules/user';
import { JWTService } from '@providers/jwt';
import {
  convertToMS,
  addMillisecondToDate,
  TokenType,
  httpError,
  HttpExceptionType,
} from '@utils/index';

import {
  RefreshToken,
  RefreshTokenPayload,
  FullRefreshToken,
  AcessTokenRequest,
  TokenRequest,
} from '../auth.type';
import { ITokenService } from '../interface';
import { RefreshTokenRepository } from '../repository';

export default class TokenService extends ServiceCore implements ITokenService {
  private readonly repository: RefreshTokenRepository;
  private readonly typeToken: TokenType;
  private readonly userService: UserService;

  constructor() {
    super();

    this.typeToken = TokenType.BEARER;

    this.userService = new UserService();
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
    body: Omit<RefreshToken, 'jwtid' | 'expiredAt'>,
  ): Promise<string> {
    const jwtid = nanoid();
    const ms = convertToMS(JwtConfig.expiresInRefreshToken);
    const expiredAt = addMillisecondToDate(new Date(), ms);

    await this.repository.createRefreshToken({ ...body, jwtid, expiredAt });

    const opts = {
      expiresIn: JwtConfig.expiresInRefreshToken,
    };
    const payload = {
      sub: String(body.userId),
      jti: jwtid,
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
      throw httpError(HttpExceptionType.TOKEN_EXPIRED);
    }

    const user = await this.getUserFromRefreshTokenPayload(payload);

    if (!user) {
      throw httpError(HttpExceptionType.TOKEN_MALFORMED);
    }

    return { user, token: refreshTokenFromDB };
  }

  async update(query: Partial<FullRefreshToken>, body: Partial<RefreshToken>) {
    await this.repository.updateRefreshToken(query, body);
  }

  private decodeRefreshToken(token: string): Promise<RefreshTokenPayload> {
    try {
      return JWTService.verifyAsync(token, JwtConfig.secretRefreshToken);
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
      throw httpError(HttpExceptionType.TOKEN_MALFORMED);
    }

    return this.repository.findOneOrFail({ userId: +sub, jwtid: jti });
  }

  private getUserFromRefreshTokenPayload(
    payload: RefreshTokenPayload,
  ): Promise<FullUser> {
    const { sub } = payload;

    if (!sub) {
      throw httpError(HttpExceptionType.TOKEN_MALFORMED);
    }

    return this.userService.getOne({ id: +sub });
  }
}
