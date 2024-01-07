import { RepositoryCtx } from '@common/types';

import {
  CreateOtpCode,
  FullOtpCode,
  OtpCodeOption,
  OtpCodeQuery,
  UpdateOtpCode,
} from '../otp.type';

export interface IOtpCodeRepository {
  create(entity: CreateOtpCode, ctx?: RepositoryCtx): Promise<FullOtpCode>;
  findOne(
    options: OtpCodeOption,
    ctx?: RepositoryCtx,
  ): Promise<FullOtpCode | null>;
  findOneOrFail(options: OtpCodeOption): Promise<FullOtpCode>;
  update(
    query: OtpCodeQuery,
    entity: UpdateOtpCode,
    ctx?: RepositoryCtx,
  ): Promise<void>;
}
