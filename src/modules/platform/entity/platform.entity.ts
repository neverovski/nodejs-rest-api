import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';

import { BaseEntity } from '@common/entities';
import { PlatformName } from '@common/enums';
import { DB_TABLE_PLATFORM } from '@database/constants';
import { UQ_PLATFORM } from '@database/constraints';
import { StringTransformer } from '@database/transformer/string.transformer';
import type { FullUser } from '@modules/user';
import { UserEntity } from '@modules/user/entity/user.entity';

import { IPlatform } from '../interface';

@Entity({ name: DB_TABLE_PLATFORM })
@Unique(UQ_PLATFORM.name, UQ_PLATFORM.columnNames)
export class PlatformEntity extends BaseEntity<IPlatform> implements IPlatform {
  @Column('enum', { enum: PlatformName })
  name!: PlatformName;

  @Column('varchar')
  ssid!: string;

  @Column('varchar', {
    nullable: true,
    transformer: new StringTransformer(),
  })
  url?: string | null;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user?: FullUser;

  @Column('int')
  userId!: number;
}
