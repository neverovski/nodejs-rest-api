import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm';

import { EntityCore } from '@core/index';
import { DB_TABLE_REFRESH_TOKEN } from '@utils/index';

import { IRefreshToken } from '../interface';

// import UserEntity from './user.entity';

@Entity({
  name: DB_TABLE_REFRESH_TOKEN,
})
export default class RefreshTokenEntity
  extends EntityCore<IRefreshToken>
  implements IRefreshToken
{
  @Column('int')
  userId!: number;

  @Column()
  token!: string;

  @Column('boolean', { default: false })
  isRevoked = false;

  @Column()
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
