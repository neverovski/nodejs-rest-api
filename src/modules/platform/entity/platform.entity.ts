import { Entity, Column, JoinColumn, ManyToOne, Unique, Index } from 'typeorm';

import { EntityCore } from '@core';
import { UserEntity } from '@modules/user/entity';
import { DB_TABLE_PLATFORM, DB_UQ_PLATFORM_SSID } from '@utils';

import { IPlatform } from '../interface';
import { PlatformNetwork } from '../platform.type';

@Entity({ name: DB_TABLE_PLATFORM })
@Unique(DB_UQ_PLATFORM_SSID, ['ssid', 'name'])
export default class PlatformEntity
  extends EntityCore<IPlatform>
  implements IPlatform
{
  @Index()
  @Column('enum', { enum: PlatformNetwork })
  name!: PlatformNetwork;

  @Index()
  @Column('varchar')
  ssid!: string;

  @Column('text', { nullable: true })
  url?: string;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: UserEntity;

  @Index()
  @Column('int')
  userId!: number;
}
