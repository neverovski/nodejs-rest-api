import { Column, JoinColumn, ManyToOne, ObjectLiteral } from 'typeorm';

import { DB_TABLE_USER } from '@common/constants';

import { BaseEntity } from './base.entity';

export class BaseCreatedByEntity<T = ObjectLiteral> extends BaseEntity<T> {
  @ManyToOne(DB_TABLE_USER, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'createdById' })
  @Column('int', { nullable: true })
  createdById?: number;

  @ManyToOne(DB_TABLE_USER, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'updatedById' })
  @Column('int', { nullable: true })
  updatedById?: number;
}
