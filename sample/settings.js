'use strict';

var config = require('../src/envfig').config;
var settings = {
    bindAddress: config('BIND_ADDRESS', '127.0.0.1'), // if envar BIND_ADDRESS is set, get it, else '127.0.0.1'
    listenPort:  config('PORT', 7744) // if envar PORT is set, get it (as number), else 7744
};
module.exports = settings;