  
const { Schema } = require('../lib/Schema.js');

describe('Schema testing', () => {

  const schema = new Schema({
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    weight: {
      type: String
    }
  });

  const spot = {
    name: 'spot',
    age: 5,
    weight: '20 lbs'
  };

  const rover = {
    name: 'rover',
    age: '10'
  };

  const molly = {
    age: 'wouldnt you like to know'
  };

  const grover = {
    name: 'grover',
    weight: '50 lbs'
  };

  const badDog = {
    name: {},
    age: 1,
    weight: '50 lbs'
  };

  // it('Returns spot as is', () => {
  //   expect(schema.validate(spot)).toEqual(spot);
  // });

  // it('Returns rover with the age turned into a number', () => {
  //   expect(schema.validate(rover)).toEqual({
  //     name: 'rover',
  //     age: 10
  //   });
  // });

  it('Throws an error for an dog missing name', () => {
    expect(() => schema.validate(molly)).toThrowErrorMatchingSnapshot();
  });

  it('Throws an error for a dog missing an age', () => {
    expect(() => schema.validate(grover)).toThrowErrorMatchingSnapshot();
  });

  it('Throws an error for a dog with a name that has an invalid data type', () => {
    expect(() => schema.validate(badDog)).toThrowErrorMatchingSnapshot();
  });
});
