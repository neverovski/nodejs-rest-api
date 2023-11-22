import { TokenMalformedException } from '@common/exceptions';

import { IRefreshTokenValidatorService } from '../interface';

export class RefreshTokenValidatorService
  implements IRefreshTokenValidatorService
{
  checkPayload(data?: JwtPayload): void {
    if (!data?.jti && !data?.sub) {
      throw new TokenMalformedException();
    }
  }
}
