//write a JSON file (writeJSON)
//read a JSON file (readJSON)
//read a directory of JSON files (fs.readdir -> [] -> Promise.all with readJSON)
//^^^^ readDirectoryJSON
//update a JSON file (updateJSON)
//delete a file(deleteFile)

const fs = require('fs').promises;

function writeJSON(path, obj){
  return fs.writeFile(path, JSON.stringify(obj));
}

function readJSON(path){
  return fs.readFile(path, { encoding: 'utf8' })
    .then(file => JSON.parse(file));
}

module.exports = {
  readJSON, writeJSON
};
