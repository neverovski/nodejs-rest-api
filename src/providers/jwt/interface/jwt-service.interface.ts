import type { DecodeOptions, SignOptions } from 'jsonwebtoken';

export interface IJwtService {
  decode(
    token: string,
    options?: DecodeOptions,
  ): null | { [key: string]: any } | string;
  sign<T>(payload: T, secret: string, opts?: SignOptions): string;
  signAsync<T>(payload: T, secret: string, opts?: SignOptions): Promise<string>;
  verify<T>(token: string, secret: string): T;
  verifyAsync<T>(token: string, secret: string): Promise<T>;
}
