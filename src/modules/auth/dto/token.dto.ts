import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class TokenDTO {
  @Expose()
  accessToken!: string;

  @Expose()
  refreshToken!: string;
}
