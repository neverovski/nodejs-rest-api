import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { DB_TABLE_USER } from '@common/constants';
import { Role } from '@common/enums';

import { UQ_USER_EMAIL } from '../constraints';

export class CreateUser1629959478561 implements MigrationInterface {
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
            name: 'isEmailConfirmed',
            type: 'bool',
            default: false,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'role',
            type: 'enum',
            enum: Object.values(Role),
            default: `'${Role.USER}'`,
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
        uniques: [UQ_USER_EMAIL],
      }),
    );
  }
}
