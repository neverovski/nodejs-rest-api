import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ProfileDTO {
  @Expose()
  firstName!: string;

  @Expose()
  lastName!: string;
}
