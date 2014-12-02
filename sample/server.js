var http = require('http');
var settings = require('./settings.js');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen(settings.listenPort, settings.bindAddress);
console.log('Started HTTP server:', settings.bindAddress + ':' + settings.listenPort);