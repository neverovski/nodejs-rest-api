import { Exclude, Expose } from 'class-transformer';

import { TokenType } from '@utils/index';

@Exclude()
export class TokenDTO {
  @Expose()
  type!: TokenType;

  @Expose()
  accessToken!: string;

  @Expose()
  refreshToken!: string;
}
