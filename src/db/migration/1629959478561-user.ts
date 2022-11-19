import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { DB_TABLE_USER, DB_UQ_USER_EMAIL } from '@utils';

export class User1629959478561 implements MigrationInterface {
  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(DB_TABLE_USER);
  }

  async up(queryRunner: QueryRunner): Promise<void> {
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
            isNullable: true,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'resetPasswordCode',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'isConfirmedEmail',
            type: 'bool',
            default: false,
          },
          {
            name: 'isActive',
            type: 'bool',
            default: true,
          },
          {
            name: 'createdAt',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'deletedAt',
            type: 'timestamptz',
            isNullable: true,
          },
        ],
        uniques: [
          {
            name: DB_UQ_USER_EMAIL,
            columnNames: ['email'],
          },
        ],
        indices: [
          {
            columnNames: ['resetPasswordCode'],
          },
        ],
      }),
    );
  }
}
