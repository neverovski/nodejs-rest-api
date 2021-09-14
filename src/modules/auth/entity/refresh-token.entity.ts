import { Entity, Column, Index, OneToOne, JoinColumn } from 'typeorm';

import { EntityCore } from '@core/index';
import { UserEntity } from '@modules/user';
import { DB_TABLE_REFRESH_TOKEN } from '@utils/index';

import { IRefreshToken } from '../interface';

@Entity({
  name: DB_TABLE_REFRESH_TOKEN,
})
export default class RefreshTokenEntity
  extends EntityCore<IRefreshToken>
  implements IRefreshToken
{
  @Index()
  @Column('int')
  userId!: number;

  @OneToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: UserEntity;

  @Index()
  @Column('varchar')
  jwtid!: string;

  @Column('boolean', { default: false })
  isRevoked = false;

  @Column('cidr', { nullable: true })
  ip!: string;

  @Column('text', { nullable: true })
  os!: string;

  @Column('text', { nullable: true })
  browser!: string;

  @Column('text', { nullable: true })
  userAgent!: string;

  @Column('timestamp')
  expiredAt!: Date;
}
