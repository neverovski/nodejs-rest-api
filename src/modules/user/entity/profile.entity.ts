import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';

import { EntityCore } from '@core/index';
import { DB_TABLE_PROFILE } from '@utils/index';

import { IProfile } from '../interface';

import UserEntity from './user.entity';

@Entity({
  name: DB_TABLE_PROFILE,
})
export default class ProfileEntity
  extends EntityCore<IProfile>
  implements IProfile
{
  @Column('int', { unique: true })
  userId!: number;

  @Column('varchar')
  firstName!: string;

  @Column('varchar')
  lastName!: string;

  @OneToOne(() => UserEntity, (user) => user.profile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: UserEntity;
}
