const { Validator } = require('./Validator.js');

class Schema {
  //create a constructor based on the schema
  constructor(schema) {
    //create a variable 'validators' that has the key/value pairs from schema
    const validators = Object.entries(schema);
    // now go t
    this.validators = validators.map(([field, configuration]) => new Validator(field, configuration));
  }

  validate(obj) {
    const validated = {};
    this.validators.forEach(validator => {
      if(validator.field in obj) {
        validated[validator.field] = validator.validate(obj);
      } 
      
      if(!(validator.field in obj) && validator.configuration.required) {
        throw new Error(`${this.field} is required`);
      }
    });
    return validated;
  }
}

module.exports = {
  Schema
};

