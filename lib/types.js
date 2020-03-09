const isNumber = val => typeof val === 'number';
const isString = str => typeof str === 'string';
const isBoolean = bool => typeof bool === 'boolean'; 
const isArray = arr => Array.isArray(arr) === true;
const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]';
const isFunction = func => typeof func === 'function';

const castToNumber = val => {
  if(isNumber(val)) return val;
  const number = Number(val);
  if(isNaN(number)) throw new CastError(Number, val);
  return number;
};

const castToString = str => {
  if(isString(str)) return str;
  if(isObject(str)) throw new CastError(str);
  if(isArray(str)) throw new CastError(str);
  const castedString = String(str);
  if(!isString(castedString)) throw new CastError(String, str);
  return castedString;
};

const castToBoolean = bool => {
  if(isObject(bool)) throw new CastError(bool); 
  if(isArray(bool)) throw new CastError(bool);
  if(isFunction(bool)) throw new CastError(bool);
  const castedBoolean = Boolean(bool);
  if(castedBoolean) return castedBoolean;
  if(!castedBoolean) return castedBoolean;
};


class CastError extends Error {
  constructor(Type, value) {
    const type = Type.name;
    super(`Cannot cast >>${value}<< to ${type}`);
    this.type = type;
    this.value = value;
  }
}

const casters = {
  Number: castToNumber,
  String: castToString,
  Boolean: castToBoolean,
};

const getCaster = Type => {  
  return casters[Type.name] || null;
};

module.exports = {
  isNumber,
  isString,
  isBoolean,
  isArray,
  isObject,
  isFunction,
  CastError,
  getCaster,
  castToNumber,
  castToString,
  castToBoolean,
};
