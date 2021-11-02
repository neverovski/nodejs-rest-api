import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

import { DB_TABLE_PROFILE, DB_TABLE_USER } from '@utils/index';

export class Profile1629959478687 implements MigrationInterface {
  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(DB_TABLE_PROFILE);
  }

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: DB_TABLE_PROFILE,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'userId',
            type: 'int',
            isUnique: true,
          },
          {
            name: 'firstName',
            type: 'varchar',
          },
          {
            name: 'lastName',
            type: 'varchar',
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
      DB_TABLE_PROFILE,
      new TableIndex({
        name: `IDX_${DB_TABLE_PROFILE.toUpperCase()}_USER_ID`,
        columnNames: ['userId'],
      }),
    );

    await queryRunner.createForeignKey(
      DB_TABLE_PROFILE,
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: DB_TABLE_USER,
        onDelete: 'CASCADE',
      }),
    );
  }
}