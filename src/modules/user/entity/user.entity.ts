import { Column, Entity, OneToOne, Unique } from 'typeorm';

import { DB_TABLE_USER } from '@common/constants';
import { BaseEntity } from '@common/entities';
import { Role } from '@common/enums';
import { UQ_USER_EMAIL } from 'src/database/constraints';
import { StringTransformer } from 'src/database/transformer';

import { IUser } from '../interface';
import { Profile } from '../types';

import { ProfileEntity } from './profile.entity';

@Entity({ name: DB_TABLE_USER })
@Unique(UQ_USER_EMAIL.name, UQ_USER_EMAIL.columnNames)
export class UserEntity extends BaseEntity<IUser> implements IUser {
  @Column('varchar', {
    nullable: true,
    transformer: new StringTransformer({ isLowerCase: true }),
  })
  email?: string;

  @Column('bool', { default: false })
  isEmailConfirmed?: boolean;

  @Column('varchar', { nullable: true })
  password?: string;

  @OneToOne(() => ProfileEntity, (profile) => profile.user)
  profile?: Profile;

  @Column('enum', { enum: Role, default: Role.USER })
  role? = Role.USER;

  getPayload(): UserPayload {
    return {
      userId: this.id,
      role: this.role!,
      ...(this.email && { email: this.email }),
      isEmailConfirmed: this.isEmailConfirmed || false,
      ...(this.profile?.firstName && { firstName: this.profile.firstName }),
      ...(this.profile?.lastName && { lastName: this.profile.lastName }),
    };
  }
}
