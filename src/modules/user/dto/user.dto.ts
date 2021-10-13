import { Exclude, Type, Expose } from 'class-transformer';

import { ProfileDTO } from './profile.dto';

@Exclude()
export class UserDTO {
  @Expose()
  id!: number;

  @Expose()
  email!: string;

  @Expose()
  @Type(() => ProfileDTO)
  profile!: ProfileDTO;

  @Expose()
  createdAt!: Date;
}
