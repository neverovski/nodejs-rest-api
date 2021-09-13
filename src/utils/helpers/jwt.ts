import { SignOptions, sign } from 'jsonwebtoken';

export const generateToken = <T extends SignOptions>(
  opts: T,
  secret: string,
): string => {
  return sign(opts, secret);
};
