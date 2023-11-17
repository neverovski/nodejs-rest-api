import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { DB_TABLE_PROFILE } from '@common/constants';
import { BaseEntity } from '@common/entities';

import { IProfile } from '../interface';
import { FullUser } from '../types';

import { UserEntity } from './user.entity';

@Entity({ name: DB_TABLE_PROFILE })
export class ProfileEntity extends BaseEntity<IProfile> implements IProfile {
  @Column('varchar')
  firstName!: string;

  @Column('varchar')
  lastName!: string;

  @OneToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user?: FullUser;

  @Column('int', { unique: true })
  userId!: number;

  get fullName() {
    return `${this?.firstName || ''} ${this?.lastName || ''}`.trim();
  }
}
