import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { DB_TABLE_REFRESH_TOKEN } from '@utils/index';

export class refreshToken1629959489269 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: DB_TABLE_REFRESH_TOKEN,
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
            name: 'token',
            type: '', // character varying(36) not null
          },
          {
            name: 'isRevoked',
            type: 'bool',
            default: false,
          },
          {
            name: 'ip',
            type: '', // cidr not null
          },
          {
            name: 'os',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'browser',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'userAgent',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'expiredAt',
            type: 'timestamp',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(DB_TABLE_REFRESH_TOKEN);
  }
}
