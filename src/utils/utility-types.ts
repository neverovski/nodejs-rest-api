import { JSONSchema7 } from 'json-schema';

export type JWTPayload = {
  email: string;
  role: string;
  sub: number;
  userId: number;
};

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

export type LoggerCtxInfo = {
  error?: Error | any;
  info?: string | any;
  message: string;
  type?: LoggerType;
};

export type LoggerCtxError = Required<
  Pick<LoggerCtxInfo, 'message' | 'error'>
> &
  Pick<LoggerCtxInfo, 'type'>;

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

export type OptionStringSchema = {
  maxLength?: number;
  minLength?: number;
};

export type OptionNumberSchema = {
  maximum?: number;
  minimum?: number;
};

export interface JSONSchemaCustom extends JSONSchema7 {
  consumes?: string[];
  properties?: {
    [key: string]: JSONSchemaCustom | boolean;
  };
  transform?: string[];
}

export enum Template {
  EMAIL_VERIFICATION = 'auth/email-verification',
  PASSWORD_CHANGED = 'user/password-changed',
  PASSWORD_RESET = 'auth/password-reset',
  REGISTRATION = 'user/registration',
}

export type TemplateRequest = {
  data?: Record<string, any>;
  isHTML?: boolean;
  isLayout?: boolean;
  template: string;
};

export type TemplateResponse = {
  html?: string;
  markdown: string;
  subject?: string;
};
