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

  @Column('bool', {
    default: true,
  })
  isConfirmedEmail = true;

  @Column('bool', {
    default: true,
  })
  isActive = true;

  @OneToOne(() => ProfileEntity, (profile) => profile.user)
  profile!: ProfileEntity;
}
