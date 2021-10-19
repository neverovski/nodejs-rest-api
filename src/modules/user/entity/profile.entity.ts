import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';

import { EntityCore } from '@core/index';
import { DB_TABLE_PROFILE } from '@utils/index';

import { IProfile } from '../interface';

import UserEntity from './user.entity';

@Entity({ name: DB_TABLE_PROFILE })
export default class ProfileEntity
  extends EntityCore<IProfile>
  implements IProfile
{
  @Column('varchar')
  firstName!: string;

  @Column('varchar')
  lastName!: string;

  @OneToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: UserEntity;

  @Column('int', { unique: true })
  userId!: number;

  public get fullName(): string {
    return `${this.firstName || ''} ${this.lastName || ''}`.trim();
  }
}
