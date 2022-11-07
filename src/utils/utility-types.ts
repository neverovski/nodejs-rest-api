import type { ClassTransformOptions } from 'class-transformer';

export enum TokenType {
  BEARER = 'Bearer',
}

export enum LoggerType {
  DB = 'DB',
  HTTP = 'Http',
  QUEUE = 'Queue',
  SERVER = 'Server',
}

export enum Role {
  ANONYMOUS = 'anonymous',
  USER = 'user',
}

export enum PostgresErrorCode {
  CheckViolation = '23514',
  ForeignKeyViolation = '23503',
  NotNullViolation = '23502',
  UniqueViolation = '23505',
}

export enum SocialNetwork {
  APPLE = 'apple',
  FACEBOOK = 'facebook',
  GITHUB = 'github',
  GOOGLE = 'google',
}

export type FacebookConfig = {
  fields: string;
  url: string;
};

export type AppleConfig = {
  url: string;
};

export type GoogleConfig = {
  clientId: string;
};

export type GitHubConfig = {
  url: string;
};

export type TransformDTO<T, DTO> = {
  data: T;
  dto?: { new (): DTO };
  options?: ClassTransformOptions;
};

export type DBClient = 'mysql' | 'mariadb' | 'postgres';

export type PlatformPayload = {
  email?: Email;
  name: SocialNetwork;
  profile?: {
    firstName?: string;
    lastName?: string;
  };
  ssid: string;
  url?: string;
};
