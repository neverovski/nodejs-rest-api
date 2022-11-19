import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { EntityCore } from '@core';
import { FullUser } from '@modules/user';
import { DB_TABLE_REFRESH_TOKEN, DB_TABLE_USER } from '@utils';

import { IRefreshToken } from '../interface';

@Entity({ name: DB_TABLE_REFRESH_TOKEN })
export default class RefreshTokenEntity
  extends EntityCore<IRefreshToken>
  implements IRefreshToken
{
  @Column('varchar', { nullable: true })
  browser?: string | null;

  @Column('timestamptz')
  expiredAt!: Date;

  @Column('varchar', { nullable: true })
  ip?: string | null;

  @Column('boolean', { default: false })
  isRevoked? = false;

  @Index()
  @Column('varchar')
  jti!: string;

  @Column('varchar', { nullable: true })
  os?: string | null;

  @ManyToOne(DB_TABLE_USER, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user?: FullUser;

  @Column('varchar', { nullable: true })
  userAgent?: string | null;

  @Index()
  @Column('int')
  userId!: number;
}
