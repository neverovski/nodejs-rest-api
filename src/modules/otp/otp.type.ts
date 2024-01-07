import { Context, FindOption } from '@common/types';
import type { FullUser } from '@modules/user';

import { IOtpCode } from './interface';

export type OtpCode = IOtpCode;
export type FullOtpCode = IdObject & IOtpCode & DateInfo;

export type CreateOtpCode = OtpCode;
export type UpdateOtpCode = Partial<CreateOtpCode>;

export type OtpCodeQuery = DeepPartial<FullOtpCode>;
export type OtpCodeOption = FindOption<OtpCodeQuery>;
export type OtpCodeCtx = Context<OtpCodeQuery>;

export type SendCode = Pick<OtpCode, 'type'> & { user: FullUser };
export type VerifyCode = Pick<OtpCode, 'code' | 'type'> & { user: FullUser };
