import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { DB_TABLE_OTP_CODE, DB_TABLE_USER } from '@common/constants';
import { OtpType } from '@common/enums';

export class CreateOtpCodes1702340059732 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(DB_TABLE_OTP_CODE);
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: DB_TABLE_OTP_CODE,
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
            name: 'code',
            type: 'varchar',
          },
          {
            name: 'type',
            type: 'enum',
            enum: Object.values(OtpType),
          },
          {
            name: 'isVerified',
            type: 'bool',
            default: false,
          },
          {
            name: 'expiredAt',
            type: 'timestamptz',
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
        foreignKeys: [
          {
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: DB_TABLE_USER,
            onDelete: 'CASCADE',
          },
        ],
        indices: [{ columnNames: ['code'] }],
      }),
      true,
    );
  }
}
