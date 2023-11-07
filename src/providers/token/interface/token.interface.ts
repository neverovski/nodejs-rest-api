import { DecoderOptions, SignerOptions, VerifierOptions } from 'fast-jwt';

export interface ITokenService {
  decodeJwt<T>(token: string, options?: Partial<DecoderOptions>): T;
  signJwt<T>(
    payload: T,
    secret: string,
    options?: Partial<SignerOptions>,
  ): Promise<string>;
  verifyJwt<T>(
    token: string,
    secret: string,
    options?: Partial<VerifierOptions>,
  ): Promise<T>;
}
