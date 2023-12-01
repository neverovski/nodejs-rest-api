import type { Schema } from 'joi';

export type JoiCtx = {
  schema: Schema;
  value: unknown;
};

export type Cors = {
  credentials: boolean;
  origin: string[];
};

export type JwtTokenType = {
  expiresIn: string;
  secret: string;
};

export type AppleConfigType = {
  url: string;
};

export type FacebookConfigType = {
  fields: string;
  url: string;
};

export type GoogleConfigType = {
  url: string;
};

export type GitHubConfigType = {
  url: string;
};

export type ConfigSSL = {
  ca?: string;
  enabled?: boolean;
};
