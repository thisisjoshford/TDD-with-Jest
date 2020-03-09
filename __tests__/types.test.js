const {
  isNumber,
  isString,
  isBoolean,
  isArray,
  isObject,
  isFunction,
  castToNumber,
  castToString,
  castToBoolean,
  getCaster
} = require('../lib/types.js');

describe('validator module', () => {
  describe('basic validation', () => {
    it('properly tells if a value is a string', () => {
      expect(isString('hello')).toBeTruthy();
      expect(isString(3)).toBeFalsy();
      expect(isString({})).toBeFalsy();
      expect(isString('yooooooo')).toBeTruthy();
      expect(isString('100')).toBeTruthy();
      expect(isString([])).toBeFalsy();
    });

    it('properly tells if a value is a numbers', () => {
      expect(isNumber(3)).toBeTruthy();
      expect(isNumber('hi')).toBeFalsy();
      expect(isNumber([])).toBeFalsy();
      expect(isNumber({})).toBeFalsy();
      expect(isNumber(() => {})).toBeFalsy();
      expect(isNumber(true)).toBeFalsy();
    });

    it('properly tells if a value is a boolean', () => {
      expect(isBoolean(true)).toBeTruthy();
      expect(isBoolean(false)).toBeTruthy();
      expect(isBoolean('true')).toBeFalsy();
      expect(isBoolean(1)).toBeFalsy();
      expect(isBoolean({})).toBeFalsy();
      expect(isBoolean([])).toBeFalsy();
    });

    it('properly tells if a value is an Array', () => {
      expect(isArray([1, 2, 3])).toBeTruthy();
      expect(isArray(['is', 'this', 'array?'])).toBeTruthy();
      expect(isArray([])).toBeTruthy();
      expect(isArray({})).toBeFalsy();
      expect(isArray('hello')).toBeFalsy();
      expect(isArray(100)).toBeFalsy();
    });

    it('properly tells if a value is an Object', () => {
      expect(isObject({})).toBeTruthy();
      expect(isObject({ key: 2, is_item: 'sure' })).toBeTruthy();
      expect(isObject({ isCool: true, howCool: 'so cool' })).toBeTruthy();
      expect(isObject([])).toBeFalsy();
      expect(isObject('yoooooo')).toBeFalsy();
      expect(isObject(true)).toBeFalsy();
      expect(isObject(123)).toBeFalsy();
    });

    it('properly tells if a value is a Function', () => {
      expect(isFunction(isNumber)).toBeTruthy();
      expect(isFunction(isString)).toBeTruthy();
      expect(isFunction(isArray)).toBeTruthy();
      expect(isFunction(isObject)).toBeTruthy();
      expect(isFunction(isBoolean)).toBeTruthy();
      expect(isFunction(123)).toBeFalsy();
      expect(isFunction('yoooo')).toBeFalsy();
      expect(isFunction({})).toBeFalsy();
      expect(isFunction([])).toBeFalsy();
  
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

    it('can cast to a string', () => {
      expect(castToString('hi')).toEqual('hi');
      expect(castToString(123)).toEqual('123');
      expect(castToString(true)).toEqual('true');
      expect(castToString(null)).toEqual('null');
    });

    it('throws if value is not castable to string', () => {
      expect(() => castToString({})).toThrowErrorMatchingSnapshot();
      expect(() => castToString([])).toThrowErrorMatchingSnapshot();
    });

    it('can cast to a boolean', () => {
      expect(castToBoolean(true)).toEqual(true);
      expect(castToBoolean(1)).toEqual(true);
      expect(castToBoolean(0)).toEqual(false);
      expect(castToBoolean(12)).toEqual(true);
    });

    it('throws if value is not castable to boolean', () => {
      expect(() => castToBoolean({})).toThrowErrorMatchingSnapshot();
      expect(() => castToBoolean([])).toThrowErrorMatchingSnapshot();
      expect(() => castToBoolean(isNumber)).toThrowErrorMatchingSnapshot();
    });

  });

  it('can get the right caster', () => {
    expect(getCaster(Number)).toEqual(castToNumber);
    expect(getCaster(Promise)).toBeNull();
    expect(getCaster(Boolean)).toEqual(castToBoolean);
    expect(getCaster(String)).toEqual(castToString);
  });
});
