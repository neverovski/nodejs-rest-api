import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

import { DB_TABLE_USER } from '@utils/index';

export class user1629959478561 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: DB_TABLE_USER,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'isConfirmedEmail',
            type: 'bool',
            default: false,
          },
          {
            name: 'isActive',
            type: 'bool',
            default: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createIndex(
      DB_TABLE_USER,
      new TableIndex({
        name: `IDX_${DB_TABLE_USER.toUpperCase()}_EMAIL`,
        columnNames: ['email'],
      }),
    );

    await queryRunner.createIndex(
      DB_TABLE_USER,
      new TableIndex({
        name: `IDX_${DB_TABLE_USER.toUpperCase()}_PASSWORD`,
        columnNames: ['password'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(DB_TABLE_USER);
  }
}
