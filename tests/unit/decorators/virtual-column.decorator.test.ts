/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import 'reflect-metadata';
import {
  VIRTUAL_COLUMN_KEY,
  VirtualColumn,
} from '@common/decorators/virtual-column.decorator';

describe('VirtualColumn', () => {
  it('should define metadata for the target with the property key as the name when no name is provided', () => {
    class TestClass {
      @VirtualColumn()
      testProperty!: string;
    }

    const metaInfo = Reflect.getMetadata(
      VIRTUAL_COLUMN_KEY,
      TestClass.prototype,
    );

    expect(metaInfo).toBeDefined();
    expect(metaInfo?.testProperty).toEqual('testProperty');
  });

  it('should define metadata for the target with the provided name', () => {
    class TestClass {
      @VirtualColumn('customName')
      testProperty!: string;
    }

    const metaInfo = Reflect.getMetadata(
      VIRTUAL_COLUMN_KEY,
      TestClass.prototype,
    );

    expect(metaInfo).toBeDefined();
    expect(metaInfo?.testProperty).toEqual('customName');
  });

  it('should not overwrite existing metadata for the target', () => {
    class TestClass {
      @VirtualColumn('name1')
      property1!: string;

      @VirtualColumn('name2')
      property2!: string;
    }

    const metaInfo = Reflect.getMetadata(
      VIRTUAL_COLUMN_KEY,
      TestClass.prototype,
    );

    expect(metaInfo).toBeDefined();
    expect(metaInfo?.property1).toEqual('name1');
    expect(metaInfo?.property2).toEqual('name2');
  });
});
