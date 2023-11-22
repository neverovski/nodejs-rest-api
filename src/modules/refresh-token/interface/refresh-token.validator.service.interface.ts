export interface IRefreshTokenValidatorService {
  checkPayload(data?: Partial<JwtPayload>): void;
}
