import { OtpType } from '@common/enums';
import type { FullUser } from '@modules/user';

export interface IOtpValidatorService {
  checkResendCode(type: OtpType, user: FullUser): Promise<void>;
}
