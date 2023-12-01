import {
  CreateDateColumn,
  ObjectLiteral,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity<T = ObjectLiteral> {
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @PrimaryGeneratedColumn()
  id!: number;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  constructor(input?: Partial<T>) {
    if (input) {
      Object.assign(this, input);
    }
  }
}
