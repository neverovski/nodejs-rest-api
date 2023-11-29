import { inject as Inject, injectable as Injectable } from 'tsyringe';

import {
  IRefreshTokenRepository,
  IRefreshTokenService,
  IRefreshTokenValidatorService,
} from '../interface';
import { RefreshTokenInject } from '../refresh-token.enum';
import { FullRefreshToken, RefreshToken } from '../refresh-token.type';

//TODO: transfer to radis
@Injectable()
export class RefreshTokenService implements IRefreshTokenService {
  constructor(
    @Inject(RefreshTokenInject.REPOSITORY)
    private readonly repository: IRefreshTokenRepository,
    @Inject(RefreshTokenInject.VALIDATOR_SERVICE)
    private readonly validator: IRefreshTokenValidatorService,
  ) {}

  create(data: RefreshToken) {
    return this.repository.create(data);
  }

  getOneByPayload({ jti, sub }: JwtPayload): Promise<RefreshToken> {
    this.validator.checkPayload({ jti, sub });

    return this.getOneWithException({ userId: Number(+sub), jti });
  }

  getOneWithException(query: Partial<FullRefreshToken>) {
    return this.repository.findOneOrFail({
      where: query,
    });
  }

  async update(query: Partial<FullRefreshToken>, data: Partial<RefreshToken>) {
    const { id } = await this.repository.findOneOrFail({
      where: query,
      select: { id: true },
    });

    await this.repository.update({ id }, data);
  }
}
