import { ValueTransformer } from 'typeorm';

type StringProp = {
  isLowerCase?: boolean;
};

export class StringTransformer implements ValueTransformer {
  private readonly isLowerCase!: boolean | null;

  constructor(props?: StringProp) {
    this.isLowerCase = props?.isLowerCase || null;
  }

  from(value: string | null) {
    return value;
  }

  to(value: string | null) {
    if (!value) {
      return null;
    }

    const str = String(value).trim();

    return this?.isLowerCase ? str.toLowerCase() : str;
  }
}
