import { inject as Inject, injectable as Injectable } from 'tsyringe';

import { OtpType, TemplatePath, TokenType } from '@common/enums';
import { ServiceCore } from '@core/service';
import {
  INotificationService,
  NotificationInject,
} from '@modules/notification';
import { IOtpService, OtpInject } from '@modules/otp';
import { IPlatformService, PlatformInject } from '@modules/platform';
import {
  IRefreshTokenService,
  RefreshTokenInject,
} from '@modules/refresh-token';
import {
  FullUser,
  IUserService,
  IUserValidatorService,
  UserInject,
} from '@modules/user';
import { ILoggerService, LoggerInject } from '@providers/logger';

import { AuthInject } from '../auth.enum';
import {
  AuthForgotPasswordByEmail,
  AuthLogin,
  AuthLogout,
  AuthPlatform,
  AuthRefreshToken,
  AuthResetPasswordByEmail,
  AuthToken,
  AuthVerifyEmail,
} from '../auth.type';
import { IAuthService, IAuthTokenService } from '../interface';

@Injectable()
export class AuthService extends ServiceCore implements IAuthService {
  constructor(
    @Inject(AuthInject.TOKEN_SERVICE)
    private authTokenService: IAuthTokenService,
    @Inject(LoggerInject.SERVICE) protected readonly logger: ILoggerService,
    @Inject(NotificationInject.SERVICE)
    private readonly notificationService: INotificationService,
    @Inject(OtpInject.SERVICE) private otpService: IOtpService,
    @Inject(PlatformInject.SERVICE) private platformService: IPlatformService,
    @Inject(RefreshTokenInject.SERVICE)
    private refreshTokenService: IRefreshTokenService,
    @Inject(UserInject.SERVICE) private userService: IUserService,
    @Inject(UserInject.VALIDATOR_SERVICE)
    private userValidatorService: IUserValidatorService,
  ) {
    super();
  }

  async forgotPasswordByEmail({ email }: AuthForgotPasswordByEmail) {
    const user = await this.userService.getOne({ email });

    if (user) {
      await this.otpService.createAndSendCode({
        type: OtpType.FORGOT_PASSWORD_BY_EMAIL,
        user,
      });
    }
  }

  async login({ email, password }: AuthLogin) {
    const user = await this.userService.getOne({ email });

    await this.userValidatorService.checkCredentials(user, password);

    return this.getTokens(user!);
  }

  async logout({ userId }: AuthLogout) {
    await this.refreshTokenService.update({ userId }, { isRevoked: true });
  }

  async platform(data: AuthPlatform) {
    const user = await this.platformService.create(data);

    return this.getTokens(user);
  }

  async refreshToken({ refreshToken }: AuthRefreshToken) {
    const data = await this.authTokenService.resolveRefreshToken(refreshToken);
    const id = Number(data.sub);

    const user = await this.userService.getOneWithException({ id });

    return this.getTokens(user);
  }

  async resetPasswordByEmail({
    email,
    code,
    password,
  }: AuthResetPasswordByEmail) {
    const user = await this.userService.getOne({ email });

    if (user) {
      await this.otpService.verifyCode({
        code,
        type: OtpType.FORGOT_PASSWORD_BY_EMAIL,
        user,
      });
      await this.userService.update({ id: user.id }, { password });

      this.notificationService.send(
        { email },
        { templatePath: TemplatePath.PASSWORD_CHANGED },
      );
    }
  }

  async sendVerifyCodeByEmail({ email }: Pick<AuthVerifyEmail, 'email'>) {
    const user = await this.userService.getOne({ email });

    this.userValidatorService.checkEmailEmpty(user);
    this.userValidatorService.checkEmailConfirmed(user);

    await this.otpService.createAndSendCode({
      type: OtpType.VERIFY_EMAIL,
      user: user!,
    });
  }

  async verifyEmailByCode({ email, code }: AuthVerifyEmail) {
    const user = await this.userService.getOne({ email });

    this.userValidatorService.checkEmailEmpty(user);
    this.userValidatorService.checkEmailConfirmed(user);

    await this.otpService.verifyCode({
      code,
      type: OtpType.VERIFY_EMAIL,
      user: user!,
    });
    await this.userService.update({ id: user!.id }, { isEmailConfirmed: true });

    this.notificationService.send(
      { email },
      { templatePath: TemplatePath.EMAIL_CONFIRMED },
    );
  }

  protected async getTokens(user: FullUser): Promise<AuthToken> {
    const [accessToken, refreshToken] = await Promise.all([
      this.authTokenService.getAccessToken(user.id, user.getPayload()),
      this.authTokenService.getRefreshToken(user.id),
    ]);

    return {
      type: TokenType.BEARER,
      accessToken,
      refreshToken,
    };
  }
}
