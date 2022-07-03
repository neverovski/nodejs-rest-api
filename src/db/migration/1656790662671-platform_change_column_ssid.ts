import {
  MigrationInterface,
  QueryRunner,
  TableIndex,
  TableUnique,
} from 'typeorm';

import { DB_TABLE_PLATFORM, DB_UQ_PLATFORM_SSID } from '@utils';

export class PlatformChangeColumnSsid1656790662671
  implements MigrationInterface
{
  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(DB_TABLE_PLATFORM);
    const indices = table?.indices.filter(
      (index) =>
        index.columnNames.includes('ssid') ||
        index.columnNames.includes('name'),
    );

    if (indices) {
      await queryRunner.dropIndices(DB_TABLE_PLATFORM, indices);
    }

    await queryRunner.dropUniqueConstraint(
      DB_TABLE_PLATFORM,
      DB_UQ_PLATFORM_SSID,
    );

    await queryRunner.createUniqueConstraint(
      DB_TABLE_PLATFORM,
      new TableUnique({
        name: DB_UQ_PLATFORM_SSID,
        columnNames: ['ssid'],
      }),
    );
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint(
      DB_TABLE_PLATFORM,
      DB_UQ_PLATFORM_SSID,
    );

    await queryRunner.createUniqueConstraint(
      DB_TABLE_PLATFORM,
      new TableUnique({
        name: DB_UQ_PLATFORM_SSID,
        columnNames: ['ssid', 'name'],
      }),
    );

    await queryRunner.createIndices(DB_TABLE_PLATFORM, [
      new TableIndex({ columnNames: ['ssid'] }),
      new TableIndex({ columnNames: ['name'] }),
    ]);
  }
}
