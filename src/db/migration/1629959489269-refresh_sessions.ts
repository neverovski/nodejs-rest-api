import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { DB_TABLE_REFRESH_SESSION } from '@utils/index';

export class refreshSessions1629959489269 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: DB_TABLE_REFRESH_SESSION,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(DB_TABLE_REFRESH_SESSION);
  }
}
