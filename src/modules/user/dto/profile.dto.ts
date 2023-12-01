import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ProfileDto {
  @Expose()
  firstName!: string;

  @Expose()
  lastName!: string;
}
