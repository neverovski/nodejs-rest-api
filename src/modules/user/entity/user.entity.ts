import { Column, Entity, OneToOne, Unique } from 'typeorm';

import { DB_TABLE_USER } from '@common/constants';
import { BaseCreatedByEntity } from '@common/entities';
import { UQ_USER_EMAIL } from '@db/constraints';
import { StringTransformer } from '@db/transformer';

import { IUser } from '../interface';
import { Profile } from '../user.type';

import { ProfileEntity } from './profile.entity';

@Entity({ name: DB_TABLE_USER })
@Unique(UQ_USER_EMAIL.name, UQ_USER_EMAIL.columnNames)
export class UserEntity extends BaseCreatedByEntity<IUser> implements IUser {
  @Column('varchar', {
    nullable: true,
    transformer: new StringTransformer({ isLowerCase: true }),
  })
  email?: string | null;

  @Column('bool', { default: false })
  isEmailConfirmed?: boolean;

  @Column('varchar', { nullable: true })
  password?: string | null;

  @OneToOne(() => ProfileEntity, (profile) => profile.user)
  profile?: Profile;

  get payload(): UserPayload {
    return {
      userId: this.id,
      ...(this.email && { email: this.email }),
      isEmailConfirmed: this.isEmailConfirmed || false,
      ...(this.profile?.firstName && { firstName: this.profile.firstName }),
      ...(this.profile?.lastName && { lastName: this.profile.lastName }),
    };
  }
}
