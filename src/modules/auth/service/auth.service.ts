import { ServiceCore } from '@core/index';
import { UserService } from '@modules/user';
import { HttpExceptionType, codeError, TokenType } from '@utils/index';

import { LoginRequest, RefreshTokenRequest, LogoutRequest } from '../auth.type';
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

  forgotPassword() {
    throw new Error('Method not implemented.');
  }

  async login(body: LoginRequest) {
    const { email, password } = body;
    const user = await this.userService.getOne({ email });
    const valid = await this.userService.validateCredentials(user, password);

    if (!valid) {
      throw codeError(HttpExceptionType.INVALID_CREDENTIALS);
    }

    const accessToken = this.tokenService.generateAccessToken({
      userId: user.id,
      email,
    });
    const refreshToken = await this.tokenService.generateRefreshToken({
      userId: user.id,
    });

    return { type: TokenType.BEARER, accessToken, refreshToken };
  }

  async logout(body: LogoutRequest) {
    const { userId } = body;

    await this.tokenService.update({ userId }, { isRevoked: true });
  }

  async refreshToken(body: RefreshTokenRequest) {
    const { user } = await this.tokenService.resolveRefreshToken(
      body.refreshToken,
    );

    const accessToken = this.tokenService.generateAccessToken({
      userId: user.id,
      email: user.email,
    });
    const refreshToken = await this.tokenService.generateRefreshToken({
      userId: user.id,
    });

    return { type: TokenType.BEARER, accessToken, refreshToken };
  }

  resetPassword() {
    throw new Error('Method not implemented.');
  }
}
