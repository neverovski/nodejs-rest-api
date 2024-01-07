import { SendCode, VerifyCode } from '../../otp.type';

export interface IOtpService {
  createAndSendCode(data: SendCode): Promise<void>;
  verifyCode(data: VerifyCode): Promise<void>;
}
