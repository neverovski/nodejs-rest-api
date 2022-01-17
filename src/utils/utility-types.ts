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
