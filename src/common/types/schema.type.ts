import type { JSONSchema7 } from 'json-schema';

import { AjvSanitizeKey } from '@common/enums';

export type JsonSchema = JSONSchema7 & {
  consumes?: string[];
  errorMessage?: {
    [key: string]: string;
  };
  formatMinimum?: any;
  maximum?: number;
  minimum?: number;
  properties?: {
    [key: string]: JsonSchema | boolean;
  };
  sanitize?: AjvSanitizeKey;
  transform?: string[];
  uniqueItemProperties?: string[];
};

export type JsonSchemaProp = {
  [key: string]: JsonSchema;
};

export type SchemaOption = {
  isOptional?: boolean;
} & Pick<
  JsonSchema,
  | 'sanitize'
  | 'maxLength'
  | 'minLength'
  | 'minimum'
  | 'maximum'
  | 'format'
  | 'transform'
>;
