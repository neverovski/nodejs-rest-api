import { OtpType } from '@common/enums';

export interface IOtpCode {
  code: string;
  expiredAt: Date;
  isVerified?: boolean;
  type: OtpType;
  userId: number;
}
