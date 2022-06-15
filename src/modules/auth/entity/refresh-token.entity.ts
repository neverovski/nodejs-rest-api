import { Entity, Column, Index, ManyToOne, JoinColumn } from 'typeorm';

import { EntityCore } from '@core';
import { UserEntity } from '@modules/user/entity';
import { DB_TABLE_REFRESH_TOKEN } from '@utils';

import { IRefreshToken } from '../interface';

@Entity({ name: DB_TABLE_REFRESH_TOKEN })
export default class RefreshTokenEntity
  extends EntityCore<IRefreshToken>
  implements IRefreshToken
{
  @Column('text', { nullable: true })
  browser!: string;

  @Column('timestamptz')
  expiredAt!: Date;

  @Column('cidr', { nullable: true })
  ip!: string;

  @Column('boolean', { default: false })
  isRevoked = false;

  @Index()
  @Column('varchar')
  jti!: string;

  @Column('text', { nullable: true })
  os!: string;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: UserEntity;

  @Column('text', { nullable: true })
  userAgent!: string;

  @Index()
  @Column('int')
  userId!: number;
}
