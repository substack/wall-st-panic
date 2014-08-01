#!/usr/bin/env node

var minimist = require('minimist');
var http = require('http');

var argv = minimist(process.argv.slice(2), {
    alias: { p: 'port' },
    default: { port: 0 }
});
var ecstatic = require('ecstatic')(__dirname + '/../static');
var server = http.createServer(ecstatic);

server.listen(argv.port, function () {
    var p = server.address().port;
    console.log('http://localhost:' + p);
});
