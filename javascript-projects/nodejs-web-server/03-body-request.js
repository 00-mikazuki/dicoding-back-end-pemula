const http = require('http');

const requestListener = (request, response) => {
  // request: instance dari http.clientRequest dan merupakan readableStream
  response.setHeader('Content-Type', 'text/html');
  response.statusCode = 200;

  // const method = request.method;
  const { method } = request;

  if(method === 'GET') {
    response.end('<h1>Hello!</h1>');
  }

  if(method === 'POST') {
    // mendapatkan body request pada method post
    let body = [];
    
    request.on('data', (chunk) => {
      body.push(chunk);
    });
  
    request.on('end', () => {
      body = Buffer.concat(body).toString();
      const { name } = JSON.parse(body); 
      // mengubah JSON string menjadi JavaScript objek
      response.end(`<h1>Hai, ${name}!</h1>`);
    });
  }

};

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
});