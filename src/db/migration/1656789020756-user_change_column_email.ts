import { MigrationInterface, QueryRunner } from 'typeorm';

import { DB_TABLE_USER } from '@utils';

export class UserChangeColumnEmail1656789020756 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE ${DB_TABLE_USER} ALTER COLUMN email SET NOT NULL`,
    );
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE ${DB_TABLE_USER} ALTER COLUMN email DROP NOT NULL`,
    );
  }
}
