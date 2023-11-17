import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';

import { BaseEntity } from '@common/entities';
import { SocialNetwork } from '@common/enums';
import { DB_TABLE_PLATFORM } from 'src/database/constants';
import { UQ_PLATFORM } from 'src/database/constraints';
import { StringTransformer } from 'src/database/transformer/string.transformer';
import type { FullUser } from '@modules/user';
import { UserEntity } from '@modules/user/entity/user.entity';

import { IPlatform } from '../interface';

@Entity({ name: DB_TABLE_PLATFORM })
@Unique(UQ_PLATFORM.name, UQ_PLATFORM.columnNames)
export class PlatformEntity extends BaseEntity<IPlatform> implements IPlatform {
  @Column('enum', { enum: SocialNetwork })
  name!: SocialNetwork;

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
