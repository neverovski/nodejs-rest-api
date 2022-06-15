/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { SelectQueryBuilder } from 'typeorm';

import { SQL_ID_NAME } from '@utils';

import { VIRTUAL_COLUMN_KEY } from '../decorators';

declare module 'typeorm' {
  interface SelectQueryBuilder<Entity> {
    getMany(this: SelectQueryBuilder<Entity>): Promise<Entity[]>;
    getOne(this: SelectQueryBuilder<Entity>): Promise<Entity | null>;
  }
}

SelectQueryBuilder.prototype.getMany = async function () {
  const { entities, raw } = await this.getRawAndEntities();
  const alias = this.expressionMap.mainAlias?.name || this.alias || '';

  const items = entities.map((entity) => {
    const metaInfo = Reflect.getMetadata(VIRTUAL_COLUMN_KEY, entity) ?? {};

    // For many-to-many
    const item = raw.find(
      (value) => value[`${alias}_${SQL_ID_NAME}`] === entity?.id,
    );

    if (item) {
      for (const [propertyKey, name] of Object.entries<string>(metaInfo)) {
        entity[propertyKey] = item[name];
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return entity;
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return [...items];
};

SelectQueryBuilder.prototype.getOne = async function () {
  const { entities, raw } = await this.getRawAndEntities();

  if (!raw.length && !entities.length) {
    return null;
  }

  const metaInfo = Reflect.getMetadata(VIRTUAL_COLUMN_KEY, entities[0]) ?? {};

  for (const [propertyKey, name] of Object.entries<string>(metaInfo)) {
    entities[0][propertyKey] = raw[0][name];
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return entities[0];
};
