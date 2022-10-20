import { Exclude, Expose, Type } from 'class-transformer';

import { ProfileDTO } from './profile.dto';

@Exclude()
export class UserDTO {
  @Expose()
  createdAt!: Date;

  @Expose()
  email!: string;

  @Expose()
  id!: number;

  @Expose()
  isConfirmedEmail!: boolean;

  @Expose()
  @Type(() => ProfileDTO)
  profile!: ProfileDTO;
}
