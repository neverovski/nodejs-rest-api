import type { DecodeOptions, SignOptions } from 'jsonwebtoken';

export interface ICrypto {
  decodeJWT(
    token: string,
    options?: DecodeOptions,
  ): null | { [key: string]: any } | string;
  generateUUID(): string;
  signJWT<T>(payload: T, secret: string, opts?: SignOptions): string;
  signJWTAsync<T>(
    payload: T,
    secret: string,
    opts?: SignOptions,
  ): Promise<string>;
  verifyJWT<T>(token: string, secret: string): T;
  verifyJWTAsync<T>(token: string, secret: string): Promise<T>;
}
