/**
 * server.js
 */
'use strict';

var commonConfig = require('./common/config.js');
var serverConfig = require('./server/config.js');
var buildConfig = buildConfig || {};

var app = require('express')();
var path = require('path');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var Starcoder = require('./Starcoder-server.js');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization, Content-Length, Accept, X-Requested-With, *");
    next();
});

var starcoder = new Starcoder([commonConfig, serverConfig, buildConfig], app, io);

var port = 0;

if (process.env.NODE_ENV === 'production') {
  port = process.env.PORT || 80;
} else {
  port = 3000;
}

console.log('Server port:', port);
server.listen(port);
