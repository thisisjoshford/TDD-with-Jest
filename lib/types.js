const isNumber = val => typeof val === 'number';
const isString = str => typeof str === 'string';
const isBoolean = bool => typeof bool === 'boolean'; 
const isArray = arr => Array.isArray(arr) === true;
const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]';

const castToNumber = val => {
  if(isNumber(val)) return val;
  const number = Number(val);
  if(isNaN(number)) throw new CastError(Number, val);
  return number;
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
  CastError,
  getCaster,
  castToNumber,
};
