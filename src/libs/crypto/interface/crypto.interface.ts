import { SignerOptions, VerifierOptions } from 'fast-jwt';

export interface ICrypto {
  generateUUID(): string;
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
