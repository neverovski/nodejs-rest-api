import { Column, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '@common/entities';
import { OtpType } from '@common/enums';
import { UserEntity } from '@modules/user/entity/user.entity';

import { IOtpCode } from '../interface';

export class OtpCodeEntity extends BaseEntity<IOtpCode> implements IOtpCode {
  @Column('varchar')
  code!: string;

  @Column('timestamptz')
  expiredAt!: Date;

  @Column('bool', { default: false })
  isVerified? = false;

  @Column('enum', { enum: OtpType })
  type!: OtpType;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  @Column('int')
  userId!: number;
}
