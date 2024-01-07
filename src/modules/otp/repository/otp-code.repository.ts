import { inject as Inject, singleton as Singleton } from 'tsyringe';

import { RepositoryCore } from '@core';
import { DatabaseInject, IDatabaseService } from '@database';

import { OtpCodeEntity } from '../entity/opt-code.entity';
import { IOtpCodeRepository } from '../interface';

@Singleton()
export class OtpCodeRepository
  extends RepositoryCore<OtpCodeEntity>
  implements IOtpCodeRepository
{
  constructor(
    @Inject(DatabaseInject.SERVICE) databaseService: IDatabaseService,
  ) {
    super(databaseService.dataSource, OtpCodeEntity);
  }
}
