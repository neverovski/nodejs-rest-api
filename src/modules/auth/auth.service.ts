import { inject, injectable } from 'tsyringe';

import { JwtConfig } from '@config';
import { ServiceCore } from '@core';
import { Crypto, Exception, HttpCode, TemplateType, i18n } from '@libs';
import {
  INotificationService,
  NotificationInject,
} from '@modules/notification';
import {
  IPlatformService,
  PlatformInject,
  PlatformRequest,
} from '@modules/platform';
import { ITokenService, TokenInject } from '@modules/token';
import { IUserService, UserInject } from '@modules/user';
import { ValidateUtil } from '@utils';

import {
  ForgotPasswordRequest,
  LoginRequest,
  LogoutRequest,
  RefreshTokenRequest,
  ResetPasswordRequest,
} from './auth.type';
import { IAuthService } from './interface';

@injectable()
export default class AuthService extends ServiceCore implements IAuthService {
  constructor(
    @inject(TokenInject.TOKEN_SERVICE) private tokenService: ITokenService,
    @inject(UserInject.USER_SERVICE) private userService: IUserService,
    @inject(NotificationInject.NOTIFICATION_SERVICE)
    private notificationService: INotificationService,
    @inject(PlatformInject.PLATFORM_SERVICE)
    private platformService: IPlatformService,
  ) {
    super();
  }

  async forgotPassword({ email }: ForgotPasswordRequest) {
    const { id } = await this.userService.getOneOrFail({ email });

    const resetPasswordCode = Crypto.generateUUID();

    const token = Crypto.signJWT(
      {
        jti: resetPasswordCode,
        sub: `${id}`,
      },
      JwtConfig.secretToken,
      {
        expiresIn: JwtConfig.expiresInToken,
      },
    );

    await this.userService.update({ id }, { resetPasswordCode });
    void this.notificationService.addToQueue({
      data: { token },
      email,
      template: TemplateType.PASSWORD_RESET,
    });
  }

  async login({ email, password }: LoginRequest, ctx: RequestCtx) {
    const user = await this.userService.getOne({ email });

    if (!user || !ValidateUtil.credentials(password, user?.password)) {
      throw Exception.getError(HttpCode.INVALID_CREDENTIALS);
    }

    return this.tokenService.getToken({ id: user.id, ...user?.payload }, ctx);
  }

  async logout({ userId }: LogoutRequest) {
    await this.tokenService.update({ userId }, { isRevoked: true });
  }

  async platform(body: PlatformRequest, ctx: RequestCtx) {
    const { userId } = await this.platformService.create(body);

    const user = await this.userService.getOneOrFail({ id: userId });

    return this.tokenService.getToken({ id: user.id, ...user?.payload }, ctx);
  }

  async refreshToken({ refreshToken }: RefreshTokenRequest, ctx: RequestCtx) {
    const payload = await this.tokenService.resolveRefreshToken(refreshToken);

    if (!payload?.sub) {
      throw Exception.getError(HttpCode.TOKEN_MALFORMED);
    }

    const user = await this.userService.getOneOrFail({ id: +payload.sub });

    return this.tokenService.getToken({ id: user.id, ...user?.payload }, ctx);
  }

  async resetPassword({ password, token }: ResetPasswordRequest) {
    const { jti, email } = await Crypto.verifyJWTAsync<JwtPayload>(
      token,
      JwtConfig.secretToken,
    );

    try {
      await this.userService.update(
        { email, resetPasswordCode: jti },
        { password: password },
      );
      void this.notificationService.addToQueue({
        email,
        template: TemplateType.PASSWORD_CHANGED,
      });
    } catch {
      throw Exception.getError(HttpCode.UNPROCESSABLE_ENTITY, {
        errors: { token: i18n()['validate.token.resetPassword'] },
      });
    }
  }
}
