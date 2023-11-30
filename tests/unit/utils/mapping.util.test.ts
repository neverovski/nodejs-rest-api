import { MappingUtil } from '@common/utils/mapping.util';

describe('MappingUtil', () => {
  describe('objToDto', () => {
    class TestClass {
      prop!: string;
    }

    it('should return an instance of the class when a class is provided', () => {
      const data = { prop: 'value' };
      const params = { data, cls: TestClass };
      const result = MappingUtil.objToDto(params);

      expect(result).toBeInstanceOf(TestClass);
      expect(result.prop).toEqual(data.prop);
    });

    it('should return the original data when no class is provided', () => {
      const data = { prop: 'value' };
      const params = { data };
      const result = MappingUtil.objToDto(params);

      expect(result).toEqual(data);
    });

    it('should return an array of instances of the class when an array of data and a class are provided', () => {
      const data = [{ prop: 'value1' }, { prop: 'value2' }];
      const params = { data, cls: TestClass };
      const result = MappingUtil.objToDto(params);

      expect(result).toBeInstanceOf(Array);

      result.forEach((item, index) => {
        expect(item).toBeInstanceOf(TestClass);
        expect(item.prop).toEqual(data?.[index]?.prop);
      });
    });

    it('should return the original array of data when an array of data and no class are provided', () => {
      const data = [{ prop: 'value1' }, { prop: 'value2' }];
      const params = { data };
      const result = MappingUtil.objToDto(params);

      expect(result).toEqual(data);
    });
  });
});
