import { nanoid } from 'nanoid';
import { injectable, inject } from 'tsyringe';

import { JwtConfig } from '@config';
import { ServiceCore } from '@core';
import { IUserService, UserInject } from '@modules/user';
import { IEmailQueue, EmailInject } from '@providers/email';
import { IJwtService, JwtInject } from '@providers/jwt';
import { HttpException } from '@utils';
import { ResponseHelper, ValidateHelper } from '@utils/helpers';

import {
  LoginRequest,
  RefreshTokenRequest,
  LogoutRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  AccessTokenPayload,
  TokenInject,
} from '../auth.type';
import { IAuthService, ITokenService } from '../interface';

@injectable()
export default class AuthService extends ServiceCore implements IAuthService {
  constructor(
    @inject(TokenInject.TOKEN_SERVICE) private tokenService: ITokenService,
    @inject(UserInject.USER_SERVICE) private userService: IUserService,
    @inject(JwtInject.JWT_SERVICE) private jwtService: IJwtService,
    @inject(EmailInject.EMAIL_QUEUE) private emailQueue: IEmailQueue,
  ) {
    super();
  }

  async forgotPassword({ email }: ForgotPasswordRequest) {
    const { id } = await this.userService.getOne({ email });

    const confirmTokenPassword = nanoid();
    const opts = {
      expiresIn: JwtConfig.expiresInToken,
    };
    const payload = {
      jti: confirmTokenPassword,
      sub: String(id),
      email,
    };

    const token = this.jwtService.sign(payload, JwtConfig.secretToken, opts);

    await this.userService.update({ id }, { confirmTokenPassword });
    void this.emailQueue.addForgotPasswordToQueue({ token, email });
  }

  async login({ email, password }: LoginRequest, ctx: Context) {
    const user = await this.userService.getOne({ email });

    if (!ValidateHelper.credentials(password, user?.password)) {
      throw ResponseHelper.error(HttpException.INVALID_CREDENTIALS);
    }

    return this.tokenService.getToken({ id: user.id, email }, ctx);
  }

  async logout({ userId }: LogoutRequest) {
    await this.tokenService.update({ userId }, { isRevoked: true });
  }

  async refreshToken({ refreshToken }: RefreshTokenRequest, ctx: Context) {
    const payload = await this.tokenService.resolveRefreshToken(refreshToken);

    if (!payload?.sub) {
      throw ResponseHelper.error(HttpException.TOKEN_MALFORMED);
    }

    const user = await this.userService.getOne({ id: +payload.sub });

    return this.tokenService.getToken({ id: user.id, email: user.email }, ctx);
  }

  async resetPassword({ password, token }: ResetPasswordRequest) {
    const { jti, email } =
      await this.jwtService.verifyAsync<AccessTokenPayload>(
        token,
        JwtConfig.secretToken,
      );

    await this.userService.update(
      { email, confirmTokenPassword: jti },
      { password: password },
    );
  }
}
