import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  OneToOne,
  Unique,
} from 'typeorm';

import { EntityCore } from '@core';
import { StringTransformer } from '@db/transformer';
import { DB_TABLE_USER, DB_UQ_USER_EMAIL } from '@utils';

import { IUser } from '../interface';

import ProfileEntity from './profile.entity';

@Entity({ name: DB_TABLE_USER })
@Unique(DB_UQ_USER_EMAIL, ['email'])
export default class UserEntity extends EntityCore<IUser> implements IUser {
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt?: Date;

  @Column('varchar', {
    nullable: true,
    transformer: new StringTransformer(),
  })
  email?: string;

  @Index()
  @Column('varchar', { nullable: true })
  emailOTP?: string;

  @Column('bool', { default: true })
  isActive = true;

  @Column('bool', { default: false })
  isConfirmedEmail = false;

  @Column('varchar', { nullable: true })
  password?: string;

  @OneToOne(() => ProfileEntity, (profile) => profile.user, {
    cascade: true,
  })
  profile?: ProfileEntity;

  get payload() {
    return {
      ...(this.email && { email: this.email }),
      isConfirmedEmail: this.isConfirmedEmail,
      ...(this.profile?.firstName && { firstName: this.profile.firstName }),
      ...(this.profile?.lastName && { lastName: this.profile.lastName }),
    };
  }
}
