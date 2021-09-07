import { Entity, Column, OneToOne } from 'typeorm';

import { EntityCore } from '@core/index';
import { DB_TABLE_USER } from '@utils/index';

import { IUser } from '../interface';

import ProfileEntity from './profile.entity';

@Entity({
  name: DB_TABLE_USER,
})
export default class UserEntity extends EntityCore<IUser> implements IUser {
  @Column('varchar', {
    unique: true,
  })
  email!: string;

  @Column('varchar', {
    select: false,
  })
  password!: string;

  @Column('bool', {
    default: false,
  })
  isConfirmedEmail = false;

  @Column('bool', {
    default: false,
  })
  isActive = false;

  @OneToOne(() => ProfileEntity, (profile) => profile.user)
  profile!: ProfileEntity;
}
