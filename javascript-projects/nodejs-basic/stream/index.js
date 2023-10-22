const fs = require('fs');
const path = require('path');

const readableStream = fs.createReadStream(path.resolve(__dirname, 'input.txt'), {
  highWaterMark: 15
});

const writableStream = fs.createWriteStream('./stream/output.txt');

readableStream.on('readable', () => {
  try {
    writableStream.write(`${readableStream.read()}\n`);
  } catch(error) {
    // catch the error when the chunk cannot be read.
  }
});

readableStream.on('end', () => {
  writableStream.end('Akhir dari writable stream!');
  console.log('Done');
});