export interface IAuthTokenService {
  getAccessToken(userId: Id, payload: UserPayload): Promise<string>;
  getRefreshToken(userId: Id): Promise<string>;
  resolveRefreshToken(token: string): Promise<JwtPayload>;
}
