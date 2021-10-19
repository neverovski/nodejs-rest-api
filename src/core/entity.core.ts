import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export default class EntityCore<T> {
  @CreateDateColumn()
  createdAt!: Date;

  @PrimaryGeneratedColumn()
  id!: number;

  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(input?: Partial<T>) {
    if (input) {
      Object.assign(this, input);
    }
  }
}
