const fs = require('fs').promises;
const writeJSON = require('./file-system.js');

const obj = 'hellooooo!';


describe('writeJSON function should write', () => {
  afterEach(() => {
    return fs.unlink('./writeJSON.txt');
  });

  it('makes a file from an obj', () => {
    return writeJSON('./writeJSON.txt', obj)
      .then(() => fs.readFile('./writeJSON.txt', { encoding: 'utf8' }));
    // .then(writeJSONText => {
    //   expect(writeJSONText).toEqual('hello\n');
  });
});


