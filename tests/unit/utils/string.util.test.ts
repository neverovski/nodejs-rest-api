import { StringUtil } from '@common/utils/string.util';

describe('StringUtil', () => {
  describe('capitalizeOnlyFirstChar', () => {
    it('should return the string with the first character capitalized', () => {
      const input = 'example';
      const result = StringUtil.capitalizeOnlyFirstChar(input);

      expect(result).toEqual('Example');
    });

    it('should return the original string when the first character is already capitalized', () => {
      const input = 'Example';
      const result = StringUtil.capitalizeOnlyFirstChar(input);

      expect(result).toEqual(input);
    });

    it('should return an empty string when the input is not a string', () => {
      const input = 123;
      const result = StringUtil.capitalizeOnlyFirstChar(
        input as unknown as string,
      );

      expect(result).toEqual('');
    });

    it('should return an empty string when the input is undefined', () => {
      const result = StringUtil.capitalizeOnlyFirstChar();

      expect(result).toEqual('');
    });

    it('should return the original string when the string is empty', () => {
      const input = '';
      const result = StringUtil.capitalizeOnlyFirstChar(input);

      expect(result).toEqual(input);
    });
  });

  describe('StringUtil', () => {
    describe('convertJsonToString', () => {
      it('should return a stringified JSON when a valid JSON is provided', () => {
        const input = { key: 'value' };
        const result = StringUtil.convertJsonToString(input);

        expect(result).toEqual('{"key":"value"}');
      });

      it('should return an empty string when the input is not a valid JSON', () => {
        const input = Symbol();
        const result = StringUtil.convertJsonToString(input);

        expect(result).toEqual('');
      });

      it('should return a stringified JSON when an array is provided', () => {
        const input = ['value1', 'value2'];
        const result = StringUtil.convertJsonToString(input);

        expect(result).toEqual('["value1","value2"]');
      });

      it('should return "null" when the input is null', () => {
        const input = null;
        const result = StringUtil.convertJsonToString(input);

        expect(result).toEqual('null');
      });

      it('should return an empty string when the input is undefined', () => {
        const result = StringUtil.convertJsonToString();

        expect(result).toEqual('');
      });
    });
  });

  describe('convertStringToJson', () => {
    it('should return a JSON object when a valid JSON string is provided', () => {
      const input = '{"key":"value"}';
      const result = StringUtil.convertStringToJson(input);

      expect(result).toEqual({ key: 'value' });
    });

    it('should return an empty object when the input is not a valid JSON string', () => {
      const input = 'invalid json string';
      const result = StringUtil.convertStringToJson(input);

      expect(result).toEqual({});
    });

    it('should return a JSON array when a valid JSON array string is provided', () => {
      const input = '["value1","value2"]';
      const result = StringUtil.convertStringToJson(input);

      expect(result).toEqual(['value1', 'value2']);
    });

    it('should return an empty object when the input is "null"', () => {
      const input = 'null';
      const result = StringUtil.convertStringToJson(input);

      expect(result).toEqual({});
    });

    it('should return an empty object  when the input is "undefined"', () => {
      const input = 'undefined';
      const result = StringUtil.convertStringToJson(input);

      expect(result).toEqual({});
    });
  });

  describe('decodeBase64ToString', () => {
    it('should return a decoded string when a valid base64 string is provided', () => {
      const input = Buffer.from('example').toString('base64');
      const result = StringUtil.decodeBase64ToString(input);

      expect(result).toEqual('example');
    });

    it('should return an empty string when the input is not a valid base64 string', () => {
      const input = 'invalid base64 string';
      const result = StringUtil.decodeBase64ToString(input);

      expect(result).toEqual('');
    });

    it('should return an empty string when the input is not a string', () => {
      const input = 123;
      const result = StringUtil.decodeBase64ToString(
        input as unknown as string,
      );

      expect(result).toEqual('');
    });

    it('should return an empty string when the input is null', () => {
      const input = null;
      const result = StringUtil.decodeBase64ToString(input);

      expect(result).toEqual('');
    });

    it('should return an empty string when the input is undefined', () => {
      const result = StringUtil.decodeBase64ToString();

      expect(result).toEqual('');
    });
  });

  describe('escape', () => {
    it('should return a string with special characters escaped', () => {
      const input = '<>/\\';
      const result = StringUtil.escape(input);

      expect(result).toEqual('&lt;&gt;&#47;&#92;');
    });

    it('should return the original string when there are no special characters to escape', () => {
      const input = 'example';
      const result = StringUtil.escape(input);

      expect(result).toEqual(input);
    });

    it('should return an empty string when the input is an empty string', () => {
      const input = '';
      const result = StringUtil.escape(input);

      expect(result).toEqual(input);
    });

    it('should return an empty string when the input is null', () => {
      const input = null;
      const result = StringUtil.escape(input);

      expect(result).toEqual('');
    });

    it('should return an empty string when the input is undefined', () => {
      const result = StringUtil.escape();

      expect(result).toEqual('');
    });
  });

  describe('replace', () => {
    it('should return a string with placeholders replaced by the corresponding values', () => {
      const input = 'Hello, {name}!';
      const keys = { name: 'World' };
      const result = StringUtil.replace(input, keys);

      expect(result).toEqual('Hello, World!');
    });

    it('should return the original string when there are no placeholders to replace', () => {
      const input = 'Hello, World!';
      const keys = { name: 'User' };
      const result = StringUtil.replace(input, keys);

      expect(result).toEqual(input);
    });

    it('should return the original string when the keys object is empty', () => {
      const input = 'Hello, {name}!';
      const keys = {};
      const result = StringUtil.replace(input, keys);

      expect(result).toEqual(input);
    });

    it('should return a string with placeholders replaced by the corresponding values when a custom delimiter is provided', () => {
      const input = 'Hello, <name>!';
      const keys = { name: 'World' };
      const delimiter = ['<', '>'];
      const result = StringUtil.replace(input, keys, delimiter);

      expect(result).toEqual('Hello, World!');
    });
  });
});
