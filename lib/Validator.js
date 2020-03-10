const { getCaster } = require('./types');

module.exports = class Validator {
  // Validator takes two properties
  // field - which is the field we are going to validate
  // configuration - which gives us info about how to validate
  constructor(field, configuration) {
    this.field = field;
    this.configuration = configuration;
  }

  // obj - is the object we want to run through validation
  validate(obj) {
    // if field is required and missing
    if(this.configuration.required && !(this.field in obj)) {
      throw new Error(`Missing required field >>${this.field}<<`);
    }

    // if not required and missing
    if(!this.configuration.required && !(this.field in obj)) {
      return null;
    }
    // getCaster(String) -> castToString
    // getCaster(Number) -> castToNumber
    // getCaster(Boolean) -> castToBoolean
    const caster = getCaster(this.configuration.type);
    return caster(obj[this.field]);
  }
};
