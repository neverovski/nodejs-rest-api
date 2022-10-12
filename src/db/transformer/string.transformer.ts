import { ValueTransformer } from 'typeorm';

export class StringTransformer implements ValueTransformer {
  from(value: string | null) {
    return value;
  }

  to(value: string | null) {
    return !value ? null : String(value).trim().toLowerCase();
  }
}
