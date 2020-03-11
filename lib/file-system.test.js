const fs = require('fs').promises;
const { writeJSON, readJSON } = require('./file-system.js');

const obj = 'hellooooo!';

describe('writeJSON', () => {
  afterEach(() => {
    return fs.unlink('./writeJSON.txt');
  });

  it('makes a file from an obj', () => {
    //write the file from a passed object
    return writeJSON('./writeJSON.txt', obj)
      //read the file so you get the (data)
      .then (() =>  fs.readFile('./writeJSON.txt', { encoding: 'utf8' }))
      //returning the result to the next .then statement as whatever you want 
      .then (theSalt => {
        //parse that data and compare it
        expect(JSON.parse(theSalt)).toEqual(obj);
      });
  });
});

describe('readJSON', () => {

  it('read a file from given path', () => {
    return readJSON('./readJSON.txt')
      .then(result => {
        expect(result).toEqual('hey there!');
      });
  });
});
