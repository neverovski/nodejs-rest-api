export interface ITokenService {
  generateAccessToken(): void;
  generateRefreshToken(): void;
}
