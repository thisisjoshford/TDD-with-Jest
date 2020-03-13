const path = require('path');
const uuid = require('uuid/v4');

const {
  mkdirp,
  writeJSON,
  readJSON,
  updateJSON,
} = require('./file-system');

class Model {
  constructor(modelName, schema) {
    this.modelName = modelName;
    this.schema = schema;
    mkdirp(this.modelName);
  }

  create(obj) {
    const _id = uuid();
    const validated = this.schema.validate(obj);
    return writeJSON(`${this.modelName}/${_id}`, { ...validated, _id });
  }

}

module.exports = {
  Model
};

