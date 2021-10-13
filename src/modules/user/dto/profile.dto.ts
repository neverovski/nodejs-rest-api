import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class ProfileDTO {
  @Expose()
  firstName!: string;

  @Expose()
  lastName!: string;
}
