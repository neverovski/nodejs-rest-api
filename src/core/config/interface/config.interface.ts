import type { Root as JoinRoot, Schema } from 'joi';

export interface IConfig {
  joi: JoinRoot;
  set<T>(env: string, validator: Schema, defaultVal: T | null): T;
}
