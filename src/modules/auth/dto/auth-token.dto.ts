import { Exclude, Expose, Transform } from 'class-transformer';

import { TokenType } from '@common/enums';

import { AuthToken } from '../auth.type';

@Exclude()
export class AuthTokenDto implements AuthToken {
  @Expose()
  accessToken!: string;

  @Expose()
  refreshToken!: string;

  @Expose()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @Transform(({ value }) => value || TokenType.BEARER)
  type!: TokenType;
}
