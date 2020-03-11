//write a JSON file (writeJSON)
//read a JSON file (readJSON)
//read a directory of JSON files (fs.readdir -> [] -> Promise.all with readJSON)
//^^^^ readDirectoryJSON
//update a JSON file (updateJSON)
//delete a file(deleteFile)

const fs = require('fs').promises;

module.exports = function writeJSON(path, obj){
  return fs.writeFile(path, JSON.stringify(obj));
};

