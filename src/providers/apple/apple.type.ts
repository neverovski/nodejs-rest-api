/* eslint-disable camelcase */
export type AppleKey = {
  alg: string;
  e: string;
  kid: string;
  kty: string;
  n: string;
  use: string;
};

export type AppleTokenPayload = {
  aud: string;
  auth_time: number;
  c_hash: string;
  email: string; // user's email
  email_verified: boolean;
  exp: number;
  iat: number;
  is_private_email: boolean;
  iss: string;
  nonce_supported: boolean;
  sub: string; // user's unique ID by apple
};
