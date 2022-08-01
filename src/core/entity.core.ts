import {
  BeforeUpdate,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export default class EntityCore<T> {
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

  @BeforeUpdate()
  updateDate() {
    this.updatedAt = new Date();
  }
}
