import { Column, JoinColumn, ManyToOne, ObjectLiteral } from 'typeorm';

import { DB_TABLE_USER } from '@common/constants';

import { BaseEntity } from './base.entity';

export class BaseCreatedByEntity<
  T = ObjectLiteral,
  CreatedBy = any,
> extends BaseEntity<T> {
  @ManyToOne(DB_TABLE_USER, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'createdById' })
  createdBy?: CreatedBy;

  @Column('int', { nullable: true })
  createdById?: number | null;

  @ManyToOne(DB_TABLE_USER, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'updatedById' })
  updatedBy?: CreatedBy;

  @Column('int', { nullable: true })
  updatedById?: number | null;
}
