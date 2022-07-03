import { Entity, Column, OneToOne, Unique, DeleteDateColumn } from 'typeorm';

import { EntityCore } from '@core';
import { DB_TABLE_USER, DB_UQ_USER_EMAIL } from '@utils';

import { IUser } from '../interface';

import ProfileEntity from './profile.entity';

@Entity({ name: DB_TABLE_USER })
@Unique(DB_UQ_USER_EMAIL, ['email'])
export default class UserEntity extends EntityCore<IUser> implements IUser {
  @Column('text', { nullable: true })
  confirmTokenPassword?: string;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt?: Date;

  @Column('varchar', { nullable: true })
  email?: string;

  @Column('bool', { default: false })
  isActive = false;

  @Column('bool', { default: false })
  isConfirmedEmail = false;

  @Column('varchar', { nullable: true })
  password?: string;

  @OneToOne(() => ProfileEntity, (profile) => profile.user, {
    eager: true,
    cascade: true,
  })
  profile!: ProfileEntity;
}
