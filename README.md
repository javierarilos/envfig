envfig
======
[![Build Status](https://travis-ci.org/javierarilos/envfig.svg?branch=master)](https://travis-ci.org/javierarilos/envfig)

***envfig*** is a minimalist Node.js library for easily enabling configuration via envars. It safely allows to get settings from ***process.env*** making type conversions (process.env.XXX is a string) and managing default values.

why configuration using system envars?
--------------------------------------
12 Factor is supporting the use of envars instead of files configuration: http://12factor.net/config

how to use it
-------------
One way of using ***envfig*** may be to have a ***settings.js**** file for configuration, that is exporting an Object. The rest of modules may require ***settings.js*** and make use of its configuration:
```javascript
// settings.js
var config = require('envfig');
var settings = {
  bindAddress: config('BIND_ADDRESS', '127.0.0.1'), // if envar BIND_ADDRESS is set, get it, else '127.0.0.1'
  listenPort:  config('PORT', 7744), // if envar PORT is set, get it (as number), else 7744
}
```
Module ***server.js*** will use ***settings.js*** to configure its HTTP listen properties:
```javascript
var http = require('http');
var settings = require('./settings.js');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(settings.listenPort, settings.bindAddress);
```


