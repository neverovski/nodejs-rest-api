import { nanoid } from 'nanoid';
import { getCustomRepository } from 'typeorm';

import { JwtConfig } from '@config/index';
import { ServiceCore } from '@core/index';
import { UserService, UserDTO } from '@modules/user';
import {
  generateToken,
  convertToMS,
  addMillisecondToDate,
  TypeToken,
  verifyToken,
  responseError,
  HttpExceptionType,
} from '@utils/index';

import {
  RefreshToken,
  AccessTokenPayload,
  RefreshTokenPayload,
} from '../auth.type';
import { ITokenService } from '../interface';
import { RefreshTokenRepository } from '../repository';

export default class TokenService extends ServiceCore implements ITokenService {
  private readonly userService: UserService;
  private readonly repository: RefreshTokenRepository;
  private readonly typeToken: TypeToken;

  constructor() {
    super();

    this.userService = new UserService();
    this.repository = getCustomRepository(RefreshTokenRepository);
    this.typeToken = TypeToken.BEARER;
  }

  generateAccessToken(
    body: Pick<RefreshToken, 'userId'> & Pick<AccessTokenPayload, 'email'>,
  ) {
    const { userId, ...data } = body;
    const opts = {
      expiresIn: JwtConfig.expiresInAccessToken,
    };
    const payload = {
      ...data,
      jti: nanoid(),
      sub: String(userId),
      typ: this.typeToken,
    };

    return generateToken(payload, JwtConfig.secretAccessToken, opts);
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

    return generateToken(payload, JwtConfig.secretRefreshToken, opts);
  }

  // async resolveRefreshToken(
  //   token: string,
  // ): Promise<{ user: User; token: RefreshToken }> {
  //   const payload = await this.decodeRefreshToken(token);
  //   const token = await this.getStoredTokenFromRefreshTokenPayload(payload);

  //   if (token.is_revoked) {
  //     throw new UnprocessableEntityException('Refresh token revoked');
  //   }

  //   const user = await this.getUserFromRefreshTokenPayload(payload);

  //   if (!user) {
  //     throw new UnprocessableEntityException('Refresh token malformed');
  //   }

  //   return { user, token };
  // }

  // FIXME: conver to private
  async decodeRefreshToken(token: string): Promise<RefreshTokenPayload> {
    try {
      return verifyToken(token, JwtConfig.secretRefreshToken);
    } catch (err) {
      throw new Error(err);
    }
  }

  // FIXME: conver to private
  async getUserFromRefreshTokenPayload(
    payload: RefreshTokenPayload,
  ): Promise<UserDTO> {
    const { sub } = payload;

    if (!sub) {
      throw responseError(HttpExceptionType.TOKEN_MALFORMED);
    }

    const { data } = await this.userService.getOne({ id: +sub });

    return data as UserDTO;
  }

  // FIXME: conver to private
  async getStoredTokenFromRefreshTokenPayload(
    payload: RefreshTokenPayload,
  ): Promise<RefreshToken | null> {
    const { jti, sub } = payload;

    if (!jti && !sub) {
      throw responseError(HttpExceptionType.TOKEN_MALFORMED);
    }

    return this.repository.findOneOrFail({ userId: +sub, jwtid: jti });
  }
}
