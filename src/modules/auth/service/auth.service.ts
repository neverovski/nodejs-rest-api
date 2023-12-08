import { inject as Inject, injectable as Injectable } from 'tsyringe';

import { TokenType } from '@common/enums';
import { ServiceCore } from '@core/service';
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
    @Inject(PlatformInject.SERVICE) private platformService: IPlatformService,
    @Inject(RefreshTokenInject.SERVICE)
    private refreshTokenService: IRefreshTokenService,
    @Inject(UserInject.SERVICE) private userService: IUserService,
    @Inject(UserInject.VALIDATOR_SERVICE)
    private userValidatorService: IUserValidatorService,
  ) {
    super();
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

  // async forgotPassword({ email }: ForgotPasswordRequest) {
  //   const { id } = await this.userService.getOneOrFail({ email });

  //   const resetPasswordCode = Crypto.generateUUID();

  //   const token = Crypto.signJwt(
  //     {
  //       jti: resetPasswordCode,
  //       sub: `${id}`,
  //     },
  //     JwtConfig.secretToken,
  //     {
  //       expiresIn: DateUtil.parseStringToMs(JwtConfig.expiresInToken),
  //     },
  //   );

  //   await this.userService.update({ id }, { resetPasswordCode });
  //   void this.notificationService.addToQueue({
  //     data: { token },
  //     email,
  //     template: TemplateType.PASSWORD_RESET,
  //   });
  // }

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
