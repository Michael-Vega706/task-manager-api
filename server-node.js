const http = require('http');

http.createServer((req, res) => {
    res.writeHead(400, { 'content-type': 'text/plain' });
    res.end('Hello world!')
}).listen(8080);

