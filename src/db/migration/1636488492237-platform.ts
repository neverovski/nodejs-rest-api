import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import {
  DB_TABLE_PLATFORM,
  DB_TABLE_USER,
  DB_UQ_PLATFORM_SSID,
  SocialNetwork,
} from '@utils';

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
            enum: Object.values(SocialNetwork),
          },
          {
            name: 'ssid',
            type: 'varchar',
          },
          {
            name: 'url',
            type: 'varchar',
            isNullable: true,
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
        ],
        uniques: [
          {
            name: DB_UQ_PLATFORM_SSID,
            columnNames: ['ssid', 'name'],
          },
        ],
        foreignKeys: [
          {
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: DB_TABLE_USER,
            onDelete: 'CASCADE',
          },
        ],
        indices: [
          { columnNames: ['ssid'] },
          { columnNames: ['name'] },
          { columnNames: ['userId'] },
        ],
      }),
      true,
    );
  }
}
