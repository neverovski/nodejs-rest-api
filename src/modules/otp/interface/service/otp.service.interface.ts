import { OtpType } from '@common/enums';
import type { FullUser } from '@modules/user';

import { FullOtpCode, SendCode } from '../../otp.type';

export interface IOtpService {
  create(type: OtpType, user: FullUser): Promise<FullOtpCode>;
  createAndSendCode(data: SendCode): Promise<void>;
  // verifyCode(data: VerifyCode): Promise<void>;
}
