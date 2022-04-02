import { Exclude, Expose } from 'class-transformer';

import { TokenType } from '@utils';

@Exclude()
export class TokenDTO {
  @Expose()
  accessToken!: string;

  @Expose()
  refreshToken!: string;

  @Expose()
  tokenType!: TokenType;
}
