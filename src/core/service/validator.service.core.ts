import { UnprocessableEntityException } from '@common/exceptions';
import { StringUtil } from '@common/utils';
import { i18n } from '@i18n';

export class ValidatorServiceCore {
  protected throwException(
    key: string,
    messageKey: string = key,
    ctx: Record<string, string | number> = {},
  ) {
    const value = this.getExceptionValue(messageKey, ctx);

    throw new UnprocessableEntityException([{ key, value }]);
  }

  private getExceptionValue(
    messageKey: string,
    ctx: Record<string, string | number> = {},
  ) {
    const message = i18n()[messageKey] as string;

    return message ? StringUtil.replace(message, ctx) : '';
  }
}
