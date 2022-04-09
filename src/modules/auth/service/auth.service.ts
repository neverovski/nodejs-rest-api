import { nanoid } from 'nanoid';
import { injectable, inject } from 'tsyringe';

import { JwtConfig } from '@config';
import { ServiceCore } from '@core';
import { IUserService } from '@modules/user';
import { EmailQueue } from '@providers/email';
import { JWTService } from '@providers/jwt';
import { HttpExceptionType } from '@utils';
import { ResponseHelper, ValidateHelper } from '@utils/helpers';

import {
  LoginRequest,
  RefreshTokenRequest,
  LogoutRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  AccessTokenPayload,
} from '../auth.type';
import { IAuthService, ITokenService } from '../interface';

@injectable()
export default class AuthService extends ServiceCore implements IAuthService {
  constructor(
    @inject('TokenService') private tokenService: ITokenService,
    @inject('UserService') private userService: IUserService,
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

    const token = JWTService.sign(payload, JwtConfig.secretToken, opts);

    await this.userService.update({ id }, { confirmTokenPassword });
    void EmailQueue.addForgotPasswordToQueue({ token, email });
  }

  async login({ email, password }: LoginRequest, ctx: Context) {
    const user = await this.userService.getOne({ email });

    if (!ValidateHelper.credentials(password, user?.password)) {
      throw ResponseHelper.error(HttpExceptionType.INVALID_CREDENTIALS);
    }

    return this.tokenService.getToken({ id: user.id, email }, ctx);
  }

  async logout({ userId }: LogoutRequest) {
    await this.tokenService.update({ userId }, { isRevoked: true });
  }

  async refreshToken({ refreshToken }: RefreshTokenRequest, ctx: Context) {
    const { user } = await this.tokenService.resolveRefreshToken(refreshToken);

    return this.tokenService.getToken({ id: user.id, email: user.email }, ctx);
  }

  async resetPassword({ password, token }: ResetPasswordRequest) {
    const { jti, email } = await JWTService.verifyAsync<AccessTokenPayload>(
      token,
      JwtConfig.secretToken,
    );

    await this.userService.update(
      { email, confirmTokenPassword: jti },
      { password: password },
    );
  }
}
