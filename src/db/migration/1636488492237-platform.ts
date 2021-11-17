import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
  TableForeignKey,
  TableUnique,
} from 'typeorm';

import { PlatformNetwork } from '@modules/platform';
import {
  DB_TABLE_PLATFORM,
  DB_TABLE_USER,
  DB_UQ_PLATFORM_SSID,
} from '@utils/index';

export class Platform1636488492237 implements MigrationInterface {
  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(DB_TABLE_PLATFORM);
  }

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: DB_TABLE_PLATFORM,
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
          },
          {
            name: 'name',
            type: 'enum',
            enum: Object.values(PlatformNetwork),
          },
          {
            name: 'ssid',
            type: 'varchar',
          },
          {
            name: 'url',
            type: 'text',
            isNullable: true,
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
      true,
    );

    await queryRunner.createUniqueConstraint(
      DB_TABLE_PLATFORM,
      new TableUnique({
        name: DB_UQ_PLATFORM_SSID,
        columnNames: ['ssid'],
      }),
    );

    await queryRunner.createIndex(
      DB_TABLE_PLATFORM,
      new TableIndex({
        columnNames: ['userId'],
      }),
    );

    await queryRunner.createForeignKey(
      DB_TABLE_PLATFORM,
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: DB_TABLE_USER,
        onDelete: 'CASCADE',
      }),
    );
  }
}
