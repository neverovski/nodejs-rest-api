import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { DB_TABLE_REFRESH_TOKEN } from '@common/constants';
import { BaseEntity } from '@common/entities';
import { StringTransformer } from '@database/transformer';
import { UserEntity } from '@modules/user/entity/user.entity';

import { IRefreshToken } from '../interface';
import { IDX_TOKEN } from '../refresh-token.constant';

@Entity({ name: DB_TABLE_REFRESH_TOKEN })
@Index(IDX_TOKEN)
export class RefreshTokenEntity
  extends BaseEntity<IRefreshToken>
  implements IRefreshToken
{
  @Column('varchar', {
    nullable: true,
    transformer: new StringTransformer(),
  })
  browser?: string;

  @Column('timestamptz')
  expiredAt!: Date;

  @Column('varchar', {
    nullable: true,
    transformer: new StringTransformer(),
  })
  ip?: string;

  @Column('boolean', { default: false })
  isRevoked? = false;

  @Column('varchar')
  jti!: string;

  @Column('varchar', {
    nullable: true,
    transformer: new StringTransformer(),
  })
  os?: string;

  @Column('varchar', {
    nullable: true,
    transformer: new StringTransformer(),
  })
  userAgent?: string;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  @Column('int')
  userId!: number;
}
