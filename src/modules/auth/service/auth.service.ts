import { inject, injectable } from 'tsyringe';

import { JwtConfig } from '@config';
import { ServiceCore } from '@core';
import { INotificationQueue, NotificationInject } from '@modules/notification';
import {
  IPlatformService,
  PlatformInject,
  PlatformRequest,
} from '@modules/platform';
import { IUserService, UserInject } from '@modules/user';
import { CryptoInject, ICryptoService } from '@providers/crypto';
import { HttpException } from '@utils';
import { ResponseHelper, ValidateHelper } from '@utils/helpers';

import {
  AccessTokenPayload,
  ForgotPasswordRequest,
  LoginRequest,
  LogoutRequest,
  RefreshTokenRequest,
  ResetPasswordRequest,
  TokenInject,
} from '../auth.type';
import { IAuthService, ITokenService } from '../interface';

@injectable()
export default class AuthService extends ServiceCore implements IAuthService {
  constructor(
    @inject(TokenInject.TOKEN_SERVICE) private tokenService: ITokenService,
    @inject(UserInject.USER_SERVICE) private userService: IUserService,
    @inject(CryptoInject.CRYPTO_SERVICE) private cryptoService: ICryptoService,
    @inject(NotificationInject.NOTIFICATION_QUEUE)
    private notificationQueue: INotificationQueue,
    @inject(PlatformInject.PLATFORM_SERVICE)
    private platformService: IPlatformService,
  ) {
    super();
  }

  async forgotPassword({ email }: ForgotPasswordRequest) {
    const { id } = await this.userService.getOneOrFail({ email });

    const emailOTP = this.cryptoService.generateUUID();

    const token = this.cryptoService.signJWT(
      {
        jti: emailOTP,
        sub: String(id),
      },
      JwtConfig.secretToken,
      {
        expiresIn: JwtConfig.expiresInToken,
      },
    );

    await this.userService.update({ id }, { emailOTP });
    void this.notificationQueue.addForgotPasswordToQueue({ token, email });
  }

  async login({ email, password }: LoginRequest, ctx: Context) {
    const user = await this.userService.getOne({ email });

    if (!user || !ValidateHelper.credentials(password, user?.password)) {
      throw ResponseHelper.error(HttpException.INVALID_CREDENTIALS);
    }

    return this.tokenService.getToken({ id: user.id, ...user?.payload }, ctx);
  }

  async logout({ userId }: LogoutRequest) {
    await this.tokenService.update({ userId }, { isRevoked: true });
  }

  async platform(body: PlatformRequest, ctx: Context) {
    const { userId } = await this.platformService.create(body);

    const user = await this.userService.getOneOrFail({ id: userId });

    return this.tokenService.getToken({ id: user.id, ...user?.payload }, ctx);
  }

  async refreshToken({ refreshToken }: RefreshTokenRequest, ctx: Context) {
    const payload = await this.tokenService.resolveRefreshToken(refreshToken);

    if (!payload?.sub) {
      throw ResponseHelper.error(HttpException.TOKEN_MALFORMED);
    }

    const user = await this.userService.getOneOrFail({ id: +payload.sub });

    return this.tokenService.getToken({ id: user.id, ...user?.payload }, ctx);
  }

  async resetPassword({ password, token }: ResetPasswordRequest) {
    const { jti, email } =
      await this.cryptoService.verifyJWTAsync<AccessTokenPayload>(
        token,
        JwtConfig.secretToken,
      );

    await this.userService.update(
      { email, emailOTP: jti },
      { password: password },
    );
  }
}
