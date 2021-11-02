import { Entity, Column, OneToOne, Index } from 'typeorm';

import { EntityCore } from '@core/index';
import { DB_TABLE_USER } from '@utils/index';

import { IUser } from '../interface';

import ProfileEntity from './profile.entity';

@Entity({ name: DB_TABLE_USER })
export default class UserEntity extends EntityCore<IUser> implements IUser {
  @Index()
  @Column('varchar', { unique: true })
  email!: string;

  @Column('bool', { default: false })
  isActive = false;

  @Column('bool', { default: false })
  isConfirmedEmail = false;

  @Index()
  @Column('varchar', { nullable: true })
  password?: string;

  @OneToOne(() => ProfileEntity, (profile) => profile.user, {
    eager: true,
    cascade: true,
  })
  profile!: ProfileEntity;
}
