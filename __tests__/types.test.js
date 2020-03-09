const {
  isNumber,
  isString,
  isBoolean,
  isArray,
  castToNumber,
  getCaster
} = require('../lib/types.js');

describe('validator module', () => {
  describe('basic validation', () => {
    it('properly tells if a value is a numbers', () => {
      expect(isNumber(3)).toBeTruthy();
      expect(isNumber('hi')).toBeFalsy();
      expect(isNumber([])).toBeFalsy();
      expect(isNumber({})).toBeFalsy();
      expect(isNumber(() => {})).toBeFalsy();
      expect(isNumber(true)).toBeFalsy();
      expect(isString('hello')).toBeTruthy();
      expect(isString(3)).toBeFalsy();
      expect(isString({})).toBeFalsy();
      expect(isString('yooooooo')).toBeTruthy();
      expect(isString('100')).toBeTruthy();
      expect(isString([])).toBeFalsy();
      expect(isBoolean(true)).toBeTruthy();
      expect(isBoolean(false)).toBeTruthy();
      expect(isBoolean('true')).toBeFalsy();
      expect(isBoolean(1)).toBeFalsy();
      expect(isBoolean({})).toBeFalsy();
      expect(isBoolean([])).toBeFalsy();
      expect(isArray([1, 2, 3])).toBeTruthy();
      expect(isArray(['is', 'this', 'array?'])).toBeTruthy();
      expect(isArray([])).toBeTruthy();
      expect(isArray({})).toBeFalsy();
      expect(isArray('hello')).toBeFalsy();
      expect(isArray(100)).toBeFalsy();
    });
  });

  describe('casters', () => {
    it('can cast values to a number', () => {
      expect(castToNumber(3)).toEqual(3);
      expect(castToNumber('3')).toEqual(3);
      expect(castToNumber(true)).toEqual(1);
      expect(castToNumber(false)).toEqual(0);
    });

    it('throws if value is not castable to number', () => {
      expect(() => castToNumber('hi')).toThrowErrorMatchingSnapshot();
      expect(() => castToNumber({})).toThrowErrorMatchingSnapshot();
    });
  });

  it('can get the right caster', () => {
    expect(getCaster(Number)).toEqual(castToNumber);
    expect(getCaster(Promise)).toBeNull();
  });
});
