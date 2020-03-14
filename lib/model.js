const uuid = require('uuid/v4');

const {
  mkdirp,
  writeJSON,
  readJSON,
  updateJSON,
  readDirectoryJSON,
  deleteFile
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

  findByIdAndUpdate(id, patchObj) {
    return updateJSON(`${this.modelName}/${id}`, patchObj);
  }

  findById(id) {
    return readJSON(`${this.modelName}/${id}`);
  }
  find(){
    return readDirectoryJSON(`${this.modelName}`);
  }

  findByIdAndDelete(id) {
    return deleteFile(`${this.modelName}/${id}`);
  }
}

module.exports = {
  Model
};


