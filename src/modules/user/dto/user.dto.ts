import { Exclude, Type, Expose } from 'class-transformer';

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
  @Type(() => ProfileDTO)
  profile!: ProfileDTO;
}
