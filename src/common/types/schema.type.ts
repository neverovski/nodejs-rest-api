import { JSONSchema7 } from 'json-schema';

import { AjvSanitizeKey } from '../enums/ajv.enum';

export type JsonSchemaProperty = {
  [key: string]: JsonSchema;
};

export type JsonSchema = JSONSchema7 & {
  consumes?: string[];
  errorMessage?: {
    [key: string]: string;
  };
  formatMinimum?: any;
  maximum?: number;
  minimum?: number;
  patternProperties?: {
    [key: string]: JsonSchema;
  };
  precision?: number;
  properties?: {
    [key: string]: JsonSchema | boolean;
  };
  reverseSort?: boolean;
  sanitize?: AjvSanitizeKey;
  transform?: string[];
  uniqueItemProperties?: string[];
};

export type JsonSchemaCtx = {
  isOptional?: boolean;
  skipRepeatSymbols?: string[];
} & Pick<
  JsonSchema,
  | 'maxLength'
  | 'minLength'
  | 'minimum'
  | 'maximum'
  | 'format'
  | 'transform'
  | 'errorMessage'
>;

export type JsonSchemaOptions = {
  body?: JsonSchema | null;
  params?: JsonSchema | null;
  query?: JsonSchema | null;
};
