import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { EntityCore } from '@core';
import { DB_TABLE_PROFILE, DB_TABLE_USER } from '@utils';

import { IProfile } from '../interface';
import { FullUser } from '../user.type';

@Entity({ name: DB_TABLE_PROFILE })
export default class ProfileEntity
  extends EntityCore<IProfile>
  implements IProfile
{
  @Column('varchar')
  firstName!: string;

  @Column('varchar')
  lastName!: string;

  @OneToOne(DB_TABLE_USER, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user?: FullUser;

  @Column('int', { unique: true })
  userId!: number;

  get fullName() {
    return `${this?.firstName || ''} ${this?.lastName || ''}`.trim();
  }
}
