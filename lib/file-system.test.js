const fs = require('fs').promises;
const writeJSON = require('./file-system.js');

const obj = 'hellooooo!';

describe('writeJSON', () => {
  afterEach(() => {
    return fs.unlink('./writeJSON.txt');
  });

  it('makes a file from an obj', () => {
    return writeJSON('./writeJSON.txt', obj)
      .then (() =>  fs.readFile('./writeJSON.txt', { encoding: 'utf8' }))
      .then (data => {
        expect(JSON.parse(data)).toEqual(obj);
      });
  });

});

// describe('readJSON', () => {

//   it('read a file from given path', () => {
//     return readJSON('./readJSON.txt')
//       .then(() => fs.readFile('./writeJSON.txt', { encoding: 'utf8' }));
//   });
// });