import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';

import { EntityCore } from '@core/index';
import { UserEntity } from '@modules/user/entity';
import { DB_TABLE_PLATFORM } from '@utils/index';

import { IPlatform } from '../interface';
import { PlatformNetwork } from '../platform.constant';

@Entity({ name: DB_TABLE_PLATFORM })
export default class PlatformEntity
  extends EntityCore<IPlatform>
  implements IPlatform
{
  @Column('enum', { enum: PlatformNetwork })
  name!: PlatformNetwork;

  @Column('varchar', { unique: true })
  ssid!: string;

  @Column('text', { nullable: true })
  url?: string;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: UserEntity;

  @Column('int')
  userId!: number;
}
