import { ServiceCore } from '@core/index';
import { UserService } from '@modules/user';
import { responseError } from '@utils/helpers';
import { HttpExceptionType } from '@utils/utility-types';

import { Login } from '../auth.type';
import { IAuthService } from '../interface';

import TokenService from './token.service';

export default class AuthService extends ServiceCore implements IAuthService {
  private readonly userService: UserService;
  private readonly tokenService: TokenService;

  constructor() {
    super();

    this.userService = new UserService();
    this.tokenService = new TokenService();
  }

  forgotPassword() {
    throw new Error('Method not implemented.');
  }

  resetPassword() {
    throw new Error('Method not implemented.');
  }

  async login(body: Login) {
    const { email, password } = body;
    const user = await this.userService.getOne({ email });
    const valid = await this.userService.validateCredentials(user, password);

    if (!valid) {
      throw responseError(HttpExceptionType.INVALID_CREDENTIALS);
    }

    const accessToken = this.tokenService.generateAccessToken({
      userId: user.id,
      email,
    });
    const refreshToken = await this.tokenService.generateRefreshToken({
      userId: user.id,
    });

    return { accessToken, refreshToken };
  }

  logout() {
    throw new Error('Method not implemented.');
  }

  refreshToken() {
    throw new Error('Method not implemented.');
  }
}
