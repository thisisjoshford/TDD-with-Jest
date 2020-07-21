const fs = require('fs').promises;
const {
  mkdirp,
  writeJSON,
  readJSON,
  readDirectoryJSON,
  updateJSON,
  deleteFile
} = require('./file-system');

//jest mock is ctesting to see if the right syntax is being passed... much like a snapshot test
jest.mock('fs', () => ({
  promises: {
    mkdir: jest.fn(() => Promise.resolve()),
    writeFile: jest.fn(() => Promise.resolve()),
    readFile: jest.fn(() => Promise.resolve('{"name":"josh"}')),
    readdir: jest.fn(() => Promise.resolve(['test.json', 'test2.json'])),
    unlink: jest.fn(() => Promise.resolve())
  }
}));

describe('file system functions', () => {
  it('makes a directory and all parent directories', () => {
    //envoke the mkdirp function
    return mkdirp('./my/super/awesome/path')
      .then(() => {
        expect(fs.mkdir)
        //check to see what is being created.. recursive means all directories one after another
          .toHaveBeenCalledWith('./my/super/awesome/path', { recursive: true });
      });
  });

  it('writes an object to a file', () => {
    const obj = {
      name: 'Josh',
      age: 37,
      weight: 'thats rude'
    };

    return writeJSON('./test.json', obj)
      .then(() => {
        // check that write file is called with the correct arguments
        // './test.json', and JSON.stringify(obj)
        expect(fs.writeFile)
          .toHaveBeenCalledWith('./test.json', JSON.stringify(obj));
        // read the file
        // make sure the file has the correct information
      });
  });

  it('can read an object from a file', () => {
    return readJSON('./test.json')
      //the result of the above line is returned to the next line as the first argument... you can name it whatever you want
      .then(whatever => {
        // make sure readFile is called with the right arguments
        expect(fs.readFile)
          .toHaveBeenCalledWith('./test.json');
        // make sure that whatever is an object not a string
        expect(whatever).toEqual({
          name: 'josh'
        });
      });
  });

  it('reads a directory of json', () => {
    return readDirectoryJSON('./data')
      .then(data => {
        // fs.readdir is called with the right arguments
        expect(fs.readdir)
          .toHaveBeenCalledWith('./data');
        // fs.readFile is called with the right arguments
        expect(fs.readFile)
          .toHaveBeenCalledWith('./data/test.json');
        expect(fs.readFile)
          .toHaveBeenCalledWith('./data/test2.json');
        // data is an array of objects
        expect(data).toEqual([
          { name: 'josh' },
          { name: 'josh' }
        ]);
      });
  });

  it('updates a files json', () => {
    return updateJSON('./test.json', { name: 'rover' })
      .then(data => {
        // readFile gets called
        expect(fs.readFile)
          .toHaveBeenCalledWith('./test.json');
        // writeFile gets called
        expect(fs.writeFile)
          .toHaveBeenCalledWith('./test.json', '{"name":"rover"}');
        // data -> { name: 'rover' }
        expect(data).toEqual({
          name: 'rover'
        });
      });
  });

  it('deletes a json file', () => {
    return deleteFile('./test.json')
      .then(() => {
        expect(fs.unlink).toHaveBeenCalledWith('./test.json');
      });
  });
});
