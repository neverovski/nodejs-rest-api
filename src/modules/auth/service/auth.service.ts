import { nanoid } from 'nanoid';

import { JwtConfig } from '@config/index';
import { ServiceCore } from '@core/index';
import { UserService } from '@modules/user';
import { EmailQueue } from '@providers/email';
import { JWTService } from '@providers/jwt';
import { HttpExceptionType, ResponseHelper } from '@utils/index';

import {
  LoginRequest,
  RefreshTokenRequest,
  LogoutRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  AccessTokenPayload,
} from '../auth.type';
import { IAuthService } from '../interface';

import TokenService from './token.service';

export default class AuthService extends ServiceCore implements IAuthService {
  private readonly tokenService: TokenService;
  private readonly userService: UserService;

  constructor() {
    super();

    this.userService = new UserService();
    this.tokenService = new TokenService();
  }

  async forgotPassword(body: ForgotPasswordRequest) {
    const { email } = body;
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

  async login(body: LoginRequest) {
    const { email, password } = body;
    const user = await this.userService.getOne({ email });

    if (!this.userService.validateCredentials(user, password)) {
      throw ResponseHelper.error(HttpExceptionType.INVALID_CREDENTIALS);
    }

    return this.tokenService.getToken({ id: user.id, email });
  }

  async logout(body: LogoutRequest) {
    const { userId } = body;

    await this.tokenService.update({ userId }, { isRevoked: true });
  }

  async refreshToken(body: RefreshTokenRequest) {
    const { user } = await this.tokenService.resolveRefreshToken(
      body.refreshToken,
    );

    return this.tokenService.getToken({ id: user.id, email: user.email });
  }

  async resetPassword(body: ResetPasswordRequest) {
    const { password, token } = body;

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
