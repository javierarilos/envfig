// singlefile-server.js
var http = require('http');
var config = require('../src/envfig').config;

var bindAddress = config('BIND_ADDRESS', '127.0.0.1'); // if envar BIND_ADDRESS is set, get it, else '127.0.0.1'
var listenPort = config('PORT', 7744); // if envar PORT is set, get it (as number), else 7744

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen(listenPort, bindAddress);
console.log('Started HTTP server:', bindAddress + ':' + listenPort);