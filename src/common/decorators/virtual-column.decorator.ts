import 'reflect-metadata';

export const VIRTUAL_COLUMN_KEY = Symbol('VIRTUAL_COLUMN_KEY');

export function VirtualColumn(name?: string): PropertyDecorator {
  return (target, propertyKey) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const metaInfo = Reflect.getMetadata(VIRTUAL_COLUMN_KEY, target) || {};

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    metaInfo[propertyKey] = name ?? propertyKey;

    Reflect.defineMetadata(VIRTUAL_COLUMN_KEY, metaInfo, target);
  };
}
