'use strict';

// const http = require('http');

// // Create an HTTP server
// var srv = http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('okay');
// });

// srv.listen(8080, '127.0.0.1');

const api = require('./jsonapi-server'),
  auth = require('./auth-proxy');

api.listen(5000);
auth.listen(6000);
