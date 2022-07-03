import { FindOneOptions } from 'typeorm';

export type OptionCtx<T> = Pick<
  FindOneOptions<T>,
  'where' | 'order' | 'relations'
>;

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

export type FacebookConfig = {
  fields: string;
  url: string;
};

export type AppleConfig = {
  url: string;
};
