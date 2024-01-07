import { inject as Inject, injectable as Injectable } from 'tsyringe';

import { OtpType, TokenType } from '@common/enums';
import { ServiceCore } from '@core/service';
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
  AuthToken,
} from '../auth.type';
import { IAuthService, IAuthTokenService } from '../interface';

@Injectable()
export class AuthService extends ServiceCore implements IAuthService {
  constructor(
    @Inject(AuthInject.TOKEN_SERVICE)
    private authTokenService: IAuthTokenService,
    @Inject(LoggerInject.SERVICE) protected readonly logger: ILoggerService,
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
        type: OtpType.RESET_PASSWORD_BY_EMAIL,
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

  // async resetPassword({ password, token }: ResetPasswordRequest) {
  //   const { jti, email } = await Crypto.verifyJwt<JwtPayload>(
  //     token,
  //     JwtConfig.secretToken,
  //   );

  // await this.userService.update({ id: user.id }, { password: password });

  //   void this.notificationService.send(query, {
  //     template: TemplateType.PASSWORD_CHANGED,
  //   });

  //   try {
  //     await this.userService.update(
  //       { email, resetPasswordCode: jti },
  //       { password: password },
  //     );
  //     void this.notificationService.addToQueue({
  //       email,
  //       template: TemplateType.PASSWORD_CHANGED,
  //     });
  //   } catch {
  //     throw Exception.getError(HttpCode.UNPROCESSABLE_ENTITY, {
  //       errors: { token: i18n()['validate.token.resetPassword'] },
  //     });
  //   }
  // }
}

// Создаем таблице OTP (one time password) для хранения временных кодов
// для восстановления пароля, подтверждения email, подтверждения телефона, подтверждения смены email и т.д.
// В таблице должны быть поля: id, user_id, code, type, expired_at, created_at, updated_at.
// Поле type должно быть enum со значениями: reset_password, confirm_email, confirm_phone, change_email.
// Поле code должно содержать код, который будет отправляться на email или телефон.
// Поле expired_at должно содержать время, когда код перестанет быть действительным.
// Отправлять код на email будем как jwt токен, в котором будет зашифрован id пользователя, код и тип кода.
// Далее добавить env OTP_RESET_PASSWORD_EXPIRED_AT, OTP_CONFIRM_EMAIL_EXPIRED_AT, OTP_CONFIRM_PHONE_EXPIRED_AT, OTP_CHANGE_EMAIL_EXPIRED_AT и тд
// В сервисе Auth добавить методы: forgotPasswordByEmail, resetPasswordByEmail
// В методе forgotPasswordByEmail создаем код, сохраняем его в таблицу OTP и отправляем на email.
// В методе resetPasswordByEmail проверяем код, если код не найден или просрочен, то выкидываем ошибку.
// Если код найден и не просрочен, то обновляем пароль пользователя и удаляем код из таблицы OTP.
