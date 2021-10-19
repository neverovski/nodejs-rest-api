import { Entity, Column, Index, OneToOne, JoinColumn } from 'typeorm';

import { EntityCore } from '@core/index';
import { UserEntity } from '@modules/user';
import { DB_TABLE_REFRESH_TOKEN } from '@utils/index';

import { IRefreshToken } from '../interface';

@Entity({ name: DB_TABLE_REFRESH_TOKEN })
export default class RefreshTokenEntity
  extends EntityCore<IRefreshToken>
  implements IRefreshToken
{
  @Column('text', { nullable: true })
  browser!: string;

  @Column('timestamp')
  expiredAt!: Date;

  @Column('cidr', { nullable: true })
  ip!: string;

  @Column('boolean', { default: false })
  isRevoked = false;

  @Index()
  @Column('varchar')
  jwtid!: string;

  @Column('text', { nullable: true })
  os!: string;

  @OneToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: UserEntity;

  @Column('text', { nullable: true })
  userAgent!: string;

  @Index()
  @Column('int')
  userId!: number;
}
