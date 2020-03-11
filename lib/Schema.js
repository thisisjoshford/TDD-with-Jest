const { Validator } = require('./Validator.js');

class Schema {
  //create a constructor based on the schema
  constructor(schema) {
    //validators h
    const validators = Object.entries(schema);
    this.validators = validators.map(([field, configuration]) => new Validator(field, configuration));
  }

  validate(obj) {
    const validated = {};
    this.validators.forEach(validator => {
      if(validator.fieldName in obj) {
        validated[validator.fieldName] = validator.validate(obj);
      } 
      
      if(!(validator.fieldName in obj) && validator.configuration.required) {
        throw new Error(`${this.fieldName} is required`);
      }
    });
    return validated;
  }
}

module.exports = {
  Schema
};

