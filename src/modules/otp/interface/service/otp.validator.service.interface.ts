import type { FullUser } from '@modules/user';

import { OtpCodeQuery } from '../../otp.type';

export interface IOtpValidatorService {
  checkCode(query: OtpCodeQuery, user: FullUser): Promise<void>;
  checkResendCode(query: OtpCodeQuery, user: FullUser): Promise<void>;
}
