import { Column, Entity, Index, JoinColumn, ManyToOne, Unique } from 'typeorm';

import { EntityCore } from '@core';
import { FullUser } from '@modules/user';
import {
  DB_TABLE_PLATFORM,
  DB_TABLE_USER,
  DB_UQ_PLATFORM_SSID,
  SocialNetwork,
} from '@utils';

import { IPlatform } from '../interface';

@Entity({ name: DB_TABLE_PLATFORM })
@Unique(DB_UQ_PLATFORM_SSID, ['ssid', 'name'])
export default class PlatformEntity
  extends EntityCore<IPlatform>
  implements IPlatform
{
  @Index()
  @Column('enum', { enum: SocialNetwork })
  name!: SocialNetwork;

  @Index()
  @Column('varchar')
  ssid!: string;

  @Column('varchar', { nullable: true })
  url?: string;

  @ManyToOne(DB_TABLE_USER, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user?: FullUser;

  @Index()
  @Column('int')
  userId!: number;
}
