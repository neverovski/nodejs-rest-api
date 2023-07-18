import { ValueTransformer } from 'typeorm';

type StringProp = {
  excludeLowerCase?: boolean;
};

export class StringTransformer implements ValueTransformer {
  private readonly excludeLowerCase!: boolean;

  constructor(props?: StringProp) {
    this.excludeLowerCase = props?.excludeLowerCase || false;
  }

  from(value: string | null) {
    return value;
  }

  to(value: string | null) {
    if (!value) {
      return null;
    }

    const str = String(value).trim();

    return this?.excludeLowerCase ? str : str.toLowerCase();
  }
}
